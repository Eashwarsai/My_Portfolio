import os
import sys

# Add the backend directory to sys.path so we can import app
sys.path.append("/home/beautifulcode/Desktop/MyWebsite/backend")

from app.core.config import settings

print(f"FIREBASE_PROJECT_ID: {settings.FIREBASE_PROJECT_ID}")
print(f"USE_FIREBASE_AUTH: {settings.USE_FIREBASE_AUTH}")
print(f"ADMIN_API_KEY: {settings.ADMIN_API_KEY}")
