from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Depends
)
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)
from services.gemini_service import ask_gemini
from reportlab.lib.styles import getSampleStyleSheet

from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from datetime import datetime
from services.parser import extract_text
from database import (
    SessionLocal,
    engine,
    Base,
    get_db
)

from models import (
    User,
    Report
)
from auth import (
    hash_password,
    verify_password
)
from services.ats import (
    calculate_score,
    recommend_career,
    generate_roadmap,
    generate_suggestions
)

from services.job_match import (
    calculate_job_match
)

from services.pdf_report import (
    generate_pdf_report
)

import os

app = FastAPI()
from database import Base

Base.metadata.create_all(
    bind=engine
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
REPORT_DIR = "reports"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

os.makedirs(
    REPORT_DIR,
    exist_ok=True
)
@app.post("/save-report")
def save_report(data: dict):

    print("SAVE REPORT DATA:")
    print(data)

    db = SessionLocal()

    ...

@app.get("/")
def home():
    return {
        "message": "SmartToolStack Backend Running"
    }


@app.post("/upload")
async def upload_resume(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    text = extract_text(file_path)

    result = calculate_score(text)

    career = recommend_career(
        result["skills"]
    )

    roadmap = generate_roadmap(
        career
    )

    analysis = generate_suggestions(
        result["skills"],
        result["missing_skills"]
    )

    return {
        "filename": file.filename,

        "ats_score": result["score"],

        "skills": result["skills"],

        "missing_skills":
        result["missing_skills"],

        "career": career,

        "roadmap": roadmap,

        "strengths":
        analysis["strengths"],

        "weaknesses":
        analysis["weaknesses"],

        "suggestions":
        analysis["suggestions"]
    }


@app.post("/job-match")
async def job_match(
    data: dict
):

    skills = data["skills"]

    job_description = data[
        "job_description"
    ]

    result = calculate_job_match(
        skills,
        job_description
    )

    return result


@app.post("/generate-report")
async def generate_report(
    data: dict
):

    pdf_path = generate_pdf_report(
        filename="career_report",

        ats_score=data["ats_score"],

        career=data["career"],

        skills=data["skills"],

        missing_skills=data[
            "missing_skills"
        ],

        roadmap=data["roadmap"],

        suggestions=data[
            "suggestions"
        ]
    )

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="Career_Report.pdf"
    )
from fastapi import HTTPException
import re

@app.post("/register")
def register(data: dict):

    if not data.get("name"):
        raise HTTPException(
            status_code=400,
            detail="Name is required"
        )

    if len(data["name"].strip()) < 3:
        raise HTTPException(
            status_code=400,
            detail="Name must be at least 3 characters"
        )

    if not data.get("email"):
        raise HTTPException(
            status_code=400,
            detail="Email is required"
        )

    email_pattern = r"^[^@]+@[^@]+\.[^@]+$"

    if not re.match(
        email_pattern,
        data["email"]
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid email address"
        )

    if not data.get("password"):
        raise HTTPException(
            status_code=400,
            detail="Password is required"
        )

    password_pattern = (
        r"^(?=.*[a-z])"
        r"(?=.*[A-Z])"
        r"(?=.*\d)"
        r"(?=.*[@$!%*?&])"
        r".{8,}$"
    )

    if not re.match(
        password_pattern,
        data["password"]
    ):
        raise HTTPException(
            status_code=400,
            detail="Weak password"
        )

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == data["email"]
    ).first()

    if existing_user:
        db.close()

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    user = User(
        name=data["name"],
        email=data["email"],
        password=hash_password(
            data["password"]
        )
    )

    db.add(user)
    db.commit()
    db.close()

    return {
        "message":
        "User registered successfully"
    }
@app.post("/login")
def login(data: dict):

    if not data.get("email"):
        raise HTTPException(
            status_code=400,
            detail="Email is required"
        )

    if not data.get("password"):
        raise HTTPException(
            status_code=400,
            detail="Password is required"
        )

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == data["email"]
    ).first()

    if not user:
        db.close()

        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    if not verify_password(
        data["password"],
        user.password
    ):
        db.close()

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    db.close()

    return {
        "message":
        "Login successful",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }
@app.post("/save-report")
def save_report(data: dict):

    db = SessionLocal()

    report = Report(
        user_id=data["user_id"],
        ats_score=str(
            data["ats_score"]
        ),
        career=data["career"],
        skills=",".join(
            data["skills"]
        ),
        missing_skills=",".join(
            data["missing_skills"]
        ),
        roadmap=",".join(
            data["roadmap"]
        ),
        created_at=str(
            datetime.now()
        )
    )

    db.add(report)
    db.commit()
    db.close()

    return {
        "message": "Report saved"
    }


@app.get("/reports/{user_id}")
def get_reports(user_id: int):

    db = SessionLocal()

    reports = db.query(
        Report
    ).filter(
        Report.user_id == user_id
    ).all()

    result = []

    for report in reports:

        result.append({
            "id": report.id,
            "user_id": report.user_id,
            "ats_score": report.ats_score,
            "career": report.career,
            "skills": report.skills.split(",")
            if report.skills else [],
            "missing_skills":
                report.missing_skills.split(",")
                if report.missing_skills else [],
            "roadmap":
                report.roadmap.split(",")
                if report.roadmap else [],
            "created_at":
                report.created_at
        })

    db.close()

    return result
@app.get("/users")
def get_users():

    db = SessionLocal()

    users = db.query(
        User
    ).all()

    result = []

    for user in users:
        result.append({
            "id": user.id,
            "name": user.name,
            "email": user.email
        })

    db.close()

    return result
@app.get("/report/{report_id}")
def get_report(
    report_id: int,
    db: Session = Depends(get_db)
):
    report = (
        db.query(Report)
        .filter(
            Report.id == report_id
        )
        .first()
    )

    if not report:
        return {
            "error":
            "Report not found"
        }

    return {
        "id": report.id,
        "user_id": report.user_id,
        "ats_score":
            report.ats_score,
        "career":
            report.career,
        "skills":
            report.skills,
        "missing_skills":
            report.missing_skills,
        "roadmap":
            report.roadmap,
        "created_at":
            str(report.created_at)
    }
@app.post("/generate-resume")
async def generate_resume(data: dict):

    pdf_path = "generated_resume.pdf"

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            data["name"],
            styles["Title"]
        )
    )

    content.append(
        Paragraph(
            data["email"],
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            data["phone"],
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 20))

    content.append(
        Paragraph(
            "Skills",
            styles["Heading2"]
        )
    )

    content.append(
        Paragraph(
            data["skills"],
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 20))

    content.append(
        Paragraph(
            "Projects",
            styles["Heading2"]
        )
    )

    content.append(
        Paragraph(
            data["projects"],
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 20))

    content.append(
        Paragraph(
            "Education",
            styles["Heading2"]
        )
    )

    content.append(
        Paragraph(
            data["education"],
            styles["Normal"]
        )
    )

    doc.build(content)

    return FileResponse(
        pdf_path,
        filename="Resume.pdf",
        media_type="application/pdf"
    )
@app.post("/generate-cover-letter")
async def generate_cover_letter(data: dict):

    pdf_path = "generated_cover_letter.pdf"

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "Cover Letter",
            styles["Title"]
        )
    )

    content.append(Spacer(1, 20))

    letter = f"""
    Dear Hiring Manager,

    I am writing to express my interest in the
    {data['job_role']} position at
    {data['company']}.

    My skills include:
    {data['skills']}.

    Relevant experience and projects:

    {data['experience']}

    I am confident that my technical skills,
    problem-solving ability, and passion for
    learning make me a strong candidate for
    this role.

    Thank you for your time and consideration.

    Sincerely,

    {data['name']}
    """

    content.append(
        Paragraph(
            letter,
            styles["BodyText"]
        )
    )

    doc.build(content)

    return FileResponse(
        pdf_path,
        filename="CoverLetter.pdf",
        media_type="application/pdf"
    )
@app.post("/generate-question")
async def generate_question(data: dict):

    role = data["role"]

    prompt = f"""
    Generate ONE realistic technical
    interview question for a
    {role}.

    Return only the question.
    """

    question = ask_gemini(
        prompt
    )

    return {
        "question": question
    }


import json

def clean_and_parse_json(text: str):
    text = text.strip()
    # Try parsing directly first
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    
    # Try stripping markdown code blocks
    cleaned = re.sub(r"^```(?:json)?\n", "", text, flags=re.IGNORECASE)
    cleaned = re.sub(r"\n```$", "", cleaned)
    cleaned = cleaned.strip()
    
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        pass
        
    # Try finding the first '{' and the last '}'
    match = re.search(r"(\{.*\})", cleaned, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except json.JSONDecodeError:
            pass
            
    # Fallback structure
    return {
        "score": 0,
        "strengths": ["Could not parse feedback details."],
        "weaknesses": ["Please try again."],
        "improved_answer": "Unable to generate improved answer due to formatting issues."
    }

@app.post("/evaluate-answer")
async def evaluate_answer(data: dict):

    question = data["question"]

    answer = data["answer"]

    prompt = f"""
You are a senior technical interviewer.

Question:
{question}

Answer:
{answer}

Return ONLY valid JSON.

{{
  "score": 0,
  "strengths": [
    ""
  ],
  "weaknesses": [
    ""
  ],
  "improved_answer": ""
}}

Do not add markdown.
Do not add explanations outside JSON.
"""

    feedback_str = ask_gemini(
        prompt
    )

    feedback_data = clean_and_parse_json(feedback_str)

    return {
        "feedback": feedback_data
    }