from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime

class Blog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    # The slug provides clean URLs (e.g. "my-first-post" instead of "?id=1")
    slug: str = Field(unique=True, index=True)
    # Storing raw Markdown string
    content: str
    published: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
