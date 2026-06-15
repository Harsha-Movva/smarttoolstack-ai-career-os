from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from services.parser import extract_text

from services.ats import (
    calculate_score,
    recommend_career,
    generate_roadmap,
    generate_suggestions
)

from services.job_match import (
    calculate_job_match
)

import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


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