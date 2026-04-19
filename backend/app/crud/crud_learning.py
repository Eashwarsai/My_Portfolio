from sqlmodel import Session, select, func
from app.models.learning import LearningLog
from app.schemas.learning import LearningLogCreate, LearningLogUpdate
from datetime import datetime

def get_learning_logs(session: Session, skip: int = 0, limit: int = 20) -> list[LearningLog]:
    """Retrieve logs for Infinite Scrolling offset queries."""
    query = select(LearningLog).order_by(LearningLog.date.desc(), LearningLog.created_at.desc()).offset(skip).limit(limit)
    return session.exec(query).all()

def create_learning_log(session: Session, log_in: LearningLogCreate) -> LearningLog:
    db_log = LearningLog.model_validate(log_in)
    session.add(db_log)
    session.commit()
    session.refresh(db_log)
    return db_log

def update_learning_log(session: Session, db_log: LearningLog, log_in: LearningLogUpdate) -> LearningLog:
    log_data = log_in.model_dump(exclude_unset=True)
    for key, value in log_data.items():
        setattr(db_log, key, value)
    
    db_log.updated_at = datetime.utcnow()
    session.add(db_log)
    session.commit()
    session.refresh(db_log)
    return db_log

def delete_learning_log(session: Session, db_log: LearningLog) -> None:
    session.delete(db_log)
    session.commit()
