KEYWORDS = [
    "python",
    "sql",
    "machine learning",
    "data science",
    "react",
    "fastapi",
    "aws",
    "docker",
    "git",
    "javascript",
    "typescript"
]


def calculate_score(text):

    text = text.lower()

    score = 0

    found_skills = []

    missing_skills = []

    for keyword in KEYWORDS:

        if keyword in text:
            score += 8
            found_skills.append(keyword)
        else:
            missing_skills.append(keyword)

    return {
        "score": min(score, 100),
        "skills": found_skills,
        "missing_skills": missing_skills
    }


def recommend_career(skills):

    skills_set = set(skills)

    roles = {
        "AI Engineer": {
            "python",
            "machine learning",
            "sql"
        },

        "Data Scientist": {
            "python",
            "sql",
            "data science"
        },

        "Full Stack Developer": {
            "react",
            "javascript",
            "typescript"
        }
    }

    best_role = "General Software Engineer"
    best_score = 0

    for role, role_skills in roles.items():

        score = len(
            skills_set.intersection(role_skills)
        )

        if score > best_score:
            best_score = score
            best_role = role

    return best_role


def generate_roadmap(career):

    roadmaps = {

        "AI Engineer": [
            "Learn Docker",
            "Learn AWS",
            "Build RAG Chatbot",
            "Deploy ML Models",
            "Master FastAPI"
        ],

        "Data Scientist": [
            "Master Statistics",
            "Advanced SQL",
            "Pandas & NumPy",
            "Machine Learning",
            "Data Visualization"
        ],

        "Full Stack Developer": [
            "Master React",
            "Learn Next.js",
            "Node.js APIs",
            "Database Design",
            "Cloud Deployment"
        ]
    }

    return roadmaps.get(
        career,
        ["Build More Projects"]
    )


def generate_suggestions(
    skills,
    missing_skills
):

    strengths = []

    weaknesses = []

    suggestions = []

    for skill in skills:

        strengths.append(
            f"Strong knowledge of {skill}"
        )

    for skill in missing_skills[:5]:

        weaknesses.append(
            f"{skill} not found"
        )

        suggestions.append(
            f"Learn {skill}"
        )

    suggestions.append(
        "Add more quantified achievements"
    )

    suggestions.append(
        "Add more real-world projects"
    )

    return {
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions
    }