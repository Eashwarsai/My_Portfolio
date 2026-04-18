from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime

class LearningLog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    category: str = Field(index=True) # E.g., Frontend, Backend, System Design, DevOps
    content: str # Small Markdown snippets
    # The exact date strings stored as YYYY-MM-DD make the heatmap grouping highly performant
    date: str = Field(index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
