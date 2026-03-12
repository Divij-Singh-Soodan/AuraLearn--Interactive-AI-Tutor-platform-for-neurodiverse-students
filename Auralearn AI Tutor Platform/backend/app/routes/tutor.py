import os
from fastapi import APIRouter, HTTPException
from google import genai
from app.models.tutor import AskTutorRequest


# This creates the router that we will link to main.py
router = APIRouter()


@router.post("/ask-tutor")
async def ask_tutor_endpoint(request: AskTutorRequest):
    # 1. Grab the API key from the .env file
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is missing from .env")


    # 2. Initialize the Gemini Client
    client = genai.Client(api_key=api_key)


    # 3. Adaptive Persona Logic
    system_instruction = "You are Aura, a supportive and brilliant AI tutor."
    if request.stress_level > 7:
        system_instruction += " The student is currently very stressed. Keep your answer brief, highly encouraging, and use simple bullet points."
    else:
         system_instruction += " Explain the concepts clearly with good technical depth."

    try:
        # 4. Call the Gemini API
        response = client.models.generate_content(
            model='gemini-2.5-flash', 
            contents=request.message,
            config=genai.types.GenerateContentConfig(
                system_instruction=system_instruction,
            )
        )
        
        
        # 5. Return the response in the exact format your React frontend expects
        return {"reply": response.text}
        
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate AI response.")