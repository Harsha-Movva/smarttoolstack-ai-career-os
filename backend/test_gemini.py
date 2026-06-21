from services.gemini_service import ask_gemini

response = ask_gemini(
    "Give me one Data Scientist interview question."
)

print(response)