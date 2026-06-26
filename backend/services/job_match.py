def calculate_job_match(
    resume_skills,
    job_description
):

    jd = job_description.lower()

    matched = []

    missing = []

    resume_skills_lower = [
        skill.lower()
        for skill in resume_skills
    ]

    for skill in resume_skills:

        if skill.lower() in jd:
            matched.append(skill)

    keywords = [
        "python",
        "sql",
        "aws",
        "docker",
        "react",
        "fastapi",
        "machine learning",
        "git",
        "typescript"
    ]

    for keyword in keywords:

        if (
            keyword in jd
            and keyword not in resume_skills_lower
        ):
            missing.append(keyword)

    total = (
        len(matched)
        + len(missing)
    )

    if total == 0:
        score = 0
    else:
        score = int(
            len(matched)
            / total
            * 100
        )

    return {
        "score": score,
        "matched": matched,
        "missing": missing
    }