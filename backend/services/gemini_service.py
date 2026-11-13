import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")


def ask_gemini(prompt: str):
    if client is None:
        return "AI service is not configured. Please try again later."

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
        )
        return response.text or "The AI service returned an empty response."
    except Exception as e:
        print("Gemini Error:", str(e))
        return """
AI service temporarily unavailable.
Please try again later.
"""
