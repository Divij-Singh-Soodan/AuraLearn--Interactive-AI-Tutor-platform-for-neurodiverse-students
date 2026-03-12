from __future__ import annotations

import os
from dataclasses import dataclass

from dotenv import load_dotenv


@dataclass(frozen=True, slots=True)
class Settings:
    gemini_api_key: str
    gemini_model: str


def load_settings() -> Settings:
    """
    Load application settings from environment variables.

    `.env` is supported via python-dotenv for local development.
    """
    load_dotenv()

    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("Missing GEMINI_API_KEY. Set it in your environment or .env.")

    model = os.getenv("GEMINI_MODEL", "gemini-2.0-flash").strip() or "gemini-2.0-flash"

    return Settings(gemini_api_key=api_key, gemini_model=model)

