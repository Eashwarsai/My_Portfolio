from sqlmodel import Session, select, func
from app.models.blog import Blog
from app.schemas.blog import BlogCreate, BlogUpdate
from datetime import datetime

def count_blogs(session: Session, only_published: bool = True) -> int:
    query = select(func.count(Blog.id))
    if only_published:
        query = query.where(Blog.published == True)
    return session.exec(query).one()

def get_blogs(session: Session, skip: int = 0, limit: int = 10, only_published: bool = True) -> list[Blog]:
    query = select(Blog).order_by(Blog.created_at.desc()).offset(skip).limit(limit)
    if only_published:
        query = query.where(Blog.published == True)
    return session.exec(query).all()

def get_blog_by_slug(session: Session, slug: str) -> Blog | None:
    return session.exec(select(Blog).where(Blog.slug == slug)).first()

def create_blog(session: Session, blog_in: BlogCreate) -> Blog:
    db_blog = Blog.model_validate(blog_in)
    session.add(db_blog)
    session.commit()
    session.refresh(db_blog)
    return db_blog

def update_blog(session: Session, db_blog: Blog, blog_in: BlogUpdate) -> Blog:
    blog_data = blog_in.model_dump(exclude_unset=True) # Only copy fields that the client sent
    for key, value in blog_data.items():
        setattr(db_blog, key, value)
    
    db_blog.updated_at = datetime.utcnow()
    session.add(db_blog)
    session.commit()
    session.refresh(db_blog)
    return db_blog

def delete_blog(session: Session, db_blog: Blog) -> None:
    session.delete(db_blog)
    session.commit()
