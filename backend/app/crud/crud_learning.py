from sqlmodel import Session, select, func
from app.models.learning import LearningLog
from app.schemas.learning import LearningLogCreate, LearningLogUpdate, HeatmapDay
from datetime import datetime

def get_learning_logs(session: Session, skip: int = 0, limit: int = 20) -> list[LearningLog]:
    """Retrieve logs for Infinite Scrolling offset queries."""
    query = select(LearningLog).order_by(LearningLog.date.desc(), LearningLog.created_at.desc()).offset(skip).limit(limit)
    return session.exec(query).all()

def get_activity_heatmap(session: Session) -> list[HeatmapDay]:
    """Calculate the count of posts per day perfectly translating to Frontend Heatmap requirements."""
    # Count rows grouping correctly by Date string natively utilizing the DB optimized engine
    query = select(LearningLog.date, func.count(LearningLog.id).label("count")).group_by(LearningLog.date).order_by(LearningLog.date.asc())
    results = session.exec(query).all()
    
    heatmap = []
    for date, count in results:
        # Scale logic for visual density mapping (0-4 required by React Activity Calendar)
        level = 1
        if count >= 4: level = 4
        elif count == 3: level = 3
        elif count == 2: level = 2
        
        heatmap.append(HeatmapDay(date=date, count=count, level=level))
        
    return heatmap

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
