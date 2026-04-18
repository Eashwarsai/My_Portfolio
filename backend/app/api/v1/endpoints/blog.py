from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.api.deps import get_session, verify_admin_key
from app.schemas.blog import BlogCreate, BlogUpdate, BlogResponse, BlogPaginatedResponse
from app.crud import crud_blog

# Router specific to the "/blogs" subset
router = APIRouter()

@router.get("/", response_model=BlogPaginatedResponse)
def read_blogs(
    page: int = 1,
    size: int = 10,
    include_unpublished: bool = False,
    session: Session = Depends(get_session)
):
    """Retrieve paginated blogs."""
    skip = (page - 1) * size
    only_published = not include_unpublished
    
    total = crud_blog.count_blogs(session, only_published=only_published)
    items = crud_blog.get_blogs(session, skip=skip, limit=size, only_published=only_published)
    
    return BlogPaginatedResponse(total=total, page=page, size=size, items=items)


@router.get("/{slug}", response_model=BlogResponse)
def read_blog_by_slug(slug: str, session: Session = Depends(get_session)):
    """Retrieve exactly one blog post by its URI slug."""
    blog = crud_blog.get_blog_by_slug(session, slug=slug)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

# ── Protected Endpoints (Requires API Key) ──

@router.post("/", response_model=BlogResponse, status_code=status.HTTP_201_CREATED)
def create_new_blog(
    blog_in: BlogCreate, 
    session: Session = Depends(get_session),
    _authorized: bool = Depends(verify_admin_key)  # Protect this route
):
    """Create a new blog (Admin Only)."""
    # Prevent duplicate slugs
    existing_blog = crud_blog.get_blog_by_slug(session, slug=blog_in.slug)
    if existing_blog:
        raise HTTPException(status_code=400, detail="A blog with this slug already exists.")
    
    return crud_blog.create_blog(session, blog_in)


@router.put("/{slug}", response_model=BlogResponse)
def update_existing_blog(
    slug: str, 
    blog_in: BlogUpdate, 
    session: Session = Depends(get_session),
    _authorized: bool = Depends(verify_admin_key)  # Protect this route
):
    """Update an existing blog (Admin Only)."""
    blog = crud_blog.get_blog_by_slug(session, slug=slug)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    # If updating slug, check duplicates
    if blog_in.slug and blog_in.slug != slug:
        conflict = crud_blog.get_blog_by_slug(session, slug=blog_in.slug)
        if conflict:
            raise HTTPException(status_code=400, detail="Target slug already exists.")
            
    return crud_blog.update_blog(session, db_blog=blog, blog_in=blog_in)


@router.delete("/{slug}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_blog(
    slug: str, 
    session: Session = Depends(get_session),
    _authorized: bool = Depends(verify_admin_key)  # Protect this route
):
    """Delete a blog (Admin Only)."""
    blog = crud_blog.get_blog_by_slug(session, slug=slug)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
        
    crud_blog.delete_blog(session, db_blog=blog)
