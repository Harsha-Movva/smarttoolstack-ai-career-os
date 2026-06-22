import json
import re

def clean_and_parse_json(text):

    text = re.sub(
        r"```json|```",
        "",
        text
    ).strip()

    return json.loads(text)
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

    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze this resume:

{text}

Return ONLY valid JSON.

{{
  "ats_score": 0,
  "skills": [],
  "missing_skills": [],
  "career": "",
  "roadmap": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}}

Do not add markdown.
Do not add explanations outside JSON.
"""

    analysis = ask_gemini(
        prompt
    )

    analysis = clean_and_parse_json(
        analysis
    )

    return {
        "filename": file.filename,

        "ats_score":
            analysis["ats_score"],

        "skills":
            analysis["skills"],

        "missing_skills":
            analysis["missing_skills"],

        "career":
            analysis["career"],

        "roadmap":
            analysis["roadmap"],

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

    summary_prompt = f"""
You are a professional resume writer.

Create ONE ATS-friendly professional summary.

Candidate Name:
{data["name"]}

Skills:
{data["skills"]}

Projects:
{data["projects"]}

Education:
{data["education"]}

Rules:
- Write exactly one summary
- 4 to 5 lines only
- No options
- No headings
- No bullet points
- No explanations
- Resume-ready format only
"""

    summary = ask_gemini(
        summary_prompt
    )

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
            "Professional Summary",
            styles["Heading2"]
        )
    )

    content.append(
        Paragraph(
            summary,
            styles["BodyText"]
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

    prompt = f"""
You are a professional career coach.

Write a professional ATS-friendly cover letter.

Candidate Name:
{data["name"]}

Job Role:
{data["job_role"]}

Company:
{data["company"]}

Skills:
{data["skills"]}

Experience:
{data["experience"]}

Rules:
- Professional tone
- 250 to 350 words
- No placeholders
- Ready to submit
- Address as 'Dear Hiring Manager'
"""

    letter = ask_gemini(
        prompt
    )

    content.append(
        Paragraph(
            "Cover Letter",
            styles["Title"]
        )
    )

    content.append(
        Spacer(1, 20)
    )

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
Generate 5 interview questions for:

{role}

Return ONLY valid JSON.

{{
  "questions": [
    "",
    "",
    "",
    "",
    ""
  ]
}}

Do not add markdown.
"""

    response = ask_gemini(
        prompt
    )

    return clean_and_parse_json(
        response
    )
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

Rules:
- Score must be between 0 and 10
- Never return a score greater than 10
- Never return a negative score
- Return valid JSON only
- Do not add markdown
- Do not add explanations outside JSON
"""

    feedback_str = ask_gemini(
        prompt
    )

    try:

        feedback_data = clean_and_parse_json(
            feedback_str
        )

        if feedback_data["score"] > 10:
            feedback_data["score"] = 10

        if feedback_data["score"] < 0:
            feedback_data["score"] = 0

    except Exception:

        feedback_data = {
            "score": 0,
            "strengths": [],
            "weaknesses": [
                "Failed to evaluate answer."
            ],
            "improved_answer":
                "Please try again."
        }

    return {
        "feedback": feedback_data
    }
@app.post("/extract-resume")
async def extract_resume(
    file: UploadFile
):

    return {
        "message":
        "Resume extraction coming soon"
    }
    
@app.post("/generate-resume-interview")
async def generate_resume_interview(data: dict):

    resume_text = data["resume"]

    prompt = f"""
You are a senior interviewer.

Resume:

{resume_text}

Generate 5 interview questions
based specifically on the resume.

Return JSON:

{{
  "questions":[]
}}
"""

    response = ask_gemini(
        prompt
    )

    return clean_and_parse_json(
        response
    )
@app.post("/career-coach")
async def career_coach(data: dict):

    ats_score = data["ats_score"]
    interview_score = data["interview_score"]
    skills = data["skills"]

    prompt = f"""
You are an expert career coach.

ATS Score:
{ats_score}

Interview Score:
{interview_score}

Skills:
{skills}

Give:

1. Strengths
2. Weaknesses
3. 30-Day Improvement Plan
4. 90-Day Career Plan

Return plain text.
"""

    response = ask_gemini(
        prompt
    )

    return {
        "advice": response
    }