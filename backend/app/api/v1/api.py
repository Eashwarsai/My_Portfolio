from fastapi import APIRouter
from app.api.v1.endpoints import blog, learning

api_router = APIRouter()

# Register the endpoints under separate routing nodes
api_router.include_router(blog.router, prefix="/blogs", tags=["Blog"])
api_router.include_router(learning.router, prefix="/learning", tags=["Learning Log"])
