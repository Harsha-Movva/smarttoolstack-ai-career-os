import fitz
from services.parser import extract_text


def create_pdf(path, pages):
    """Create a small PDF with one text string per page."""
    doc = fitz.open()
    for page_text in pages:
        page = doc.new_page()
        page.insert_text((72, 72), page_text)
    doc.save(path)
    doc.close()


def test_extract_text_from_readable_pdf(tmp_path):
    pdf_path = tmp_path / "readable_resume.pdf"
    create_pdf(pdf_path, ["Python SQL FastAPI"])

    result = extract_text(str(pdf_path))

    assert "Python" in result
    assert "SQL" in result
    assert "FastAPI" in result


def test_extract_text_from_multiple_pages(tmp_path):
    pdf_path = tmp_path / "two_pages.pdf"
    create_pdf(pdf_path, ["First page content", "Second page content"])

    result = extract_text(str(pdf_path))

    assert "First page content" in result
    assert "Second page content" in result


def test_extract_text_from_blank_pdf(tmp_path):
    pdf_path = tmp_path / "blank.pdf"
    create_pdf(pdf_path, [""])

    result = extract_text(str(pdf_path))

    assert result.strip() == ""
