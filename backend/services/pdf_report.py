from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)


def generate_pdf_report(
    filename,
    ats_score,
    career,
    skills,
    missing_skills,
    roadmap,
    suggestions
):

    pdf_path = f"reports/{filename}.pdf"

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "SmartToolStack Career Report",
            styles["Title"]
        )
    )

    content.append(Spacer(1, 20))

    content.append(
        Paragraph(
            f"ATS Score: {ats_score}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"Career Path: {career}",
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 10))

    content.append(
        Paragraph(
            "Detected Skills",
            styles["Heading2"]
        )
    )

    for skill in skills:
        content.append(
            Paragraph(
                f"• {skill}",
                styles["Normal"]
            )
        )

    content.append(
        Paragraph(
            "Missing Skills",
            styles["Heading2"]
        )
    )

    for skill in missing_skills:
        content.append(
            Paragraph(
                f"• {skill}",
                styles["Normal"]
            )
        )

    content.append(
        Paragraph(
            "Learning Roadmap",
            styles["Heading2"]
        )
    )

    for item in roadmap:
        content.append(
            Paragraph(
                f"• {item}",
                styles["Normal"]
            )
        )

    content.append(
        Paragraph(
            "Recommendations",
            styles["Heading2"]
        )
    )

    for item in suggestions:
        content.append(
            Paragraph(
                f"• {item}",
                styles["Normal"]
            )
        )

    doc.build(content)

    return pdf_path