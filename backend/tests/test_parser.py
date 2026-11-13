from services.parser import extract_text
import fitz


def create_pdf(path, pages):
    doc = fitz.open()

    for page_text in pages:
        page = doc.new_page()
        page.insert_text((72, 72), page_text)

    doc.save(path)
    doc.close()


def test_extract_text_from_readable_pdf(tmp_path):
    pdf = tmp_path / "resume.pdf"
    create_pdf(pdf, ["Python SQL FastAPI"])

    result = extract_text(str(pdf))

    assert "Python" in result
    assert "SQL" in result
    assert "FastAPI" in result


def test_extract_text_from_multiple_pages(tmp_path):
    pdf = tmp_path / "multiple.pdf"
    create_pdf(pdf, ["First page", "Second page"])

    result = extract_text(str(pdf))

    assert "First page" in result
    assert "Second page" in result


def test_extract_text_from_blank_pdf(tmp_path):
    pdf = tmp_path / "blank.pdf"
    create_pdf(pdf, [""])

    result = extract_text(str(pdf))

    assert result.strip() == ""
