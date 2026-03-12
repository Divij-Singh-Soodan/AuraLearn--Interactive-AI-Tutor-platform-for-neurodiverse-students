from __future__ import annotations

from pydantic import BaseModel, Field, field_validator


class AskTutorRequest(BaseModel):
    message: str = Field(..., min_length=1, description="Student message / question.")
    stress_level: int = Field(
        ..., ge=1, le=10, description="Student stress level (1-10)."
    )

    @field_validator("message")
    @classmethod
    def message_must_not_be_blank(cls, v: str) -> str:
        v2 = v.strip()
        if not v2:
            raise ValueError("message must be a non-empty string")
        return v2


class AskTutorResponse(BaseModel):
    response: str
    persona: str = Field(
        ..., description='One of: "brief_bullets" (high stress) or "technical_depth".'
    )

