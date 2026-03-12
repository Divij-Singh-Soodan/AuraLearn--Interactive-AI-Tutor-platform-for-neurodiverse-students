import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# 1. Load environment variables from the .env file
# This is crucial! It tells Python to read your .env file so os.getenv("GEMINI_API_KEY") works.
load_dotenv()

# 2. Import your AI Tutor router
# This connects the logic from your newly created backend/app/routes/tutor.py file
from app.routes import tutor

def create_app() -> FastAPI:
    """
    Application factory for the Auralearn AI Tutor backend.
    """
    app = FastAPI(
        title="Auralearn AI Tutor Backend",
        version="0.1.0",
        description="Backend API for the Auralearn AI Tutor platform.",
    )

    # 3. Configure CORS (The "Bridge" to your Frontend)
    # This explicitly permits your Vite frontend to make requests to this backend.
    origins = [
        "http://localhost:3000",
        "http://localhost:5173",  # Standard Vite port
        "http://localhost:8080",  # The port your frontend is currently using
        "http://127.0.0.1:8080",
        "http://127.0.0.1:5173",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # 4. Register the endpoints
    # This officially registers the /ask-tutor URL into your application
    app.include_router(tutor.router)

    @app.get("/health", tags=["health"])
    async def health_check() -> dict[str, str]:
        """Simple health check to verify the server is running."""
        return {"status": "ok"}

    return app


# Create the app instance
app = create_app()


if __name__ == "__main__":
    import uvicorn
    # Start the local development server
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)