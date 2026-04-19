from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import List

from app.api.deps import get_session, verify_admin_key
from app.schemas.learning import LearningLogCreate, LearningLogUpdate, LearningLogResponse
from app.crud import crud_learning
from app.models.learning import LearningLog

router = APIRouter()

@router.get("/", response_model=List[LearningLogResponse])
def read_logs(skip: int = 0, limit: int = 20, session: Session = Depends(get_session)):
    """Retrieve journals based on Skip/Limit tailored for Infinite Scrolling UI."""
    return crud_learning.get_learning_logs(session, skip=skip, limit=limit)

# ── Protected Endpoints (Requires API Key) ──

@router.post("/", response_model=LearningLogResponse, status_code=status.HTTP_201_CREATED)
def create_new_log(
    log_in: LearningLogCreate, 
    session: Session = Depends(get_session),
    _authorized: bool = Depends(verify_admin_key)  # Protect this route
):
    """Log a new daily entry (Admin Only)."""
    return crud_learning.create_learning_log(session, log_in)

@router.put("/{log_id}", response_model=LearningLogResponse)
def update_existing_log(
    log_id: int, 
    log_in: LearningLogUpdate, 
    session: Session = Depends(get_session),
    _authorized: bool = Depends(verify_admin_key)  # Protect this route
):
    """Update a previous journal entry (Admin Only)."""
    db_log = session.get(LearningLog, log_id)
    if not db_log:
        raise HTTPException(status_code=404, detail="Log not found")
        
    return crud_learning.update_learning_log(session, db_log=db_log, log_in=log_in)

@router.delete("/{log_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_log(
    log_id: int, 
    session: Session = Depends(get_session),
    _authorized: bool = Depends(verify_admin_key)  # Protect this route
):
    """Remove a previously logged entry (Admin Only)."""
    db_log = session.get(LearningLog, log_id)
    if not db_log:
        raise HTTPException(status_code=404, detail="Log not found")
        
    crud_learning.delete_learning_log(session, db_log=db_log)
