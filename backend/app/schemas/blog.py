from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

# ── Base Properties ──
class BlogBase(BaseModel):
    title: str
    slug: str
    content: str
    published: bool = False

# ── Properties received on Creation ──
class BlogCreate(BlogBase):
    pass

# ── Properties received on Update ──
class BlogUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    published: Optional[bool] = None

# ── Standard Response ──
class BlogResponse(BlogBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    # Ensures Pydantic can read data directly from the SQLModel objects
    model_config = ConfigDict(from_attributes=True)

# ── Paginated Response ──
class BlogPaginatedResponse(BaseModel):
    total: int
    page: int
    size: int
    items: List[BlogResponse]
