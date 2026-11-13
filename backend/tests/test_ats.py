
from services.ats import (
    calculate_score,
    recommend_career,
    generate_roadmap,
    generate_suggestions
)


# 1. ATS score tests

def test_calculate_score_with_matching_skills():
    result = calculate_score("Python SQL FastAPI")

    assert result["score"] == 24
    assert "python" in result["skills"]
    assert "sql" in result["skills"]
    assert "fastapi" in result["skills"]


def test_calculate_score_is_case_insensitive():
    result = calculate_score("PYTHON SQL REACT")

    assert result["score"] == 24
    assert len(result["skills"]) == 3


def test_calculate_score_with_no_matching_skills():
    result = calculate_score("I know communication and teamwork")

    assert result["score"] == 0
    assert result["skills"] == []
    assert len(result["missing_skills"]) == 11


# 2. Career recommendation tests

def test_recommend_ai_engineer():
    result = recommend_career(
        ["python", "machine learning", "sql"]
    )

    assert result == "AI Engineer"


def test_recommend_full_stack_developer():
    result = recommend_career(
        ["react", "javascript", "typescript"]
    )

    assert result == "Full Stack Developer"


def test_recommend_general_software_engineer():
    result = recommend_career([])

    assert result == "General Software Engineer"


# 3. Career roadmap tests

def test_generate_ai_engineer_roadmap():
    result = generate_roadmap("AI Engineer")

    assert "Learn Docker" in result
    assert "Learn AWS" in result
    assert len(result) == 5


def test_generate_default_roadmap():
    result = generate_roadmap("Unknown Career")

    assert result == ["Build More Projects"]


# 4. Suggestion generation tests

def test_generate_suggestions():
    result = generate_suggestions(
        ["python", "sql"],
        ["react", "aws"]
    )

    assert len(result["strengths"]) == 2
    assert "Strong knowledge of python" in result["strengths"]
    assert "react not found" in result["weaknesses"]
    assert "Learn react" in result["suggestions"]


def test_generate_suggestions_with_many_missing_skills():
    result = generate_suggestions(
        [],
        ["python", "sql", "react", "aws", "docker", "git"]
    )

    assert len(result["weaknesses"]) == 5
    assert len(result["suggestions"]) == 7
