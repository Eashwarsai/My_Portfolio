from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

# ── Base Properties ──
class LearningLogBase(BaseModel):
    category: str
    content: str
    date: str

# ── Properties received on Creation ──
class LearningLogCreate(LearningLogBase):
    pass

# ── Properties received on Update ──
class LearningLogUpdate(BaseModel):
    category: Optional[str] = None
    content: Optional[str] = None
    date: Optional[str] = None

# ── Standard Response ──
class LearningLogResponse(LearningLogBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
