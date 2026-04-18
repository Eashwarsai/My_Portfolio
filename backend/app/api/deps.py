import firebase_admin
import os
from firebase_admin import auth, credentials
from typing import Generator
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import Session
from app.core.db import engine
from app.core.config import settings

# Initialize Firebase Admin once at the module level
import json
import logging
# Configure standard logging for production visibility
logger = logging.getLogger("app")

# Initialize Firebase Admin once at the module level
if not firebase_admin._apps:
    try:
        cred = None
        
        # Priority 1: Raw JSON string from Environment Variable (Standard for Cloud)
        if settings.FIREBASE_SERVICE_ACCOUNT_JSON:
            logger.info("Initializing Firebase via raw JSON environment variable")
            service_account_info = json.loads(settings.FIREBASE_SERVICE_ACCOUNT_JSON)
            cred = credentials.Certificate(service_account_info)
        
        # Priority 2: File Path (Standard for Local Dev)
        elif settings.FIREBASE_SERVICE_ACCOUNT_PATH:
            # Resolve absolute path
            current_dir = os.path.dirname(os.path.abspath(__file__))
            backend_root = os.path.dirname(os.path.dirname(current_dir))
            cert_path = settings.FIREBASE_SERVICE_ACCOUNT_PATH
            if not os.path.isabs(cert_path):
                cert_path = os.path.join(backend_root, cert_path)
            
            if os.path.exists(cert_path):
                logger.info(f"Initializing Firebase via service account file: {cert_path}")
                cred = credentials.Certificate(cert_path)

        if cred:
            firebase_admin.initialize_app(cred)
        else:
            # Fallback 3: Project ID only (Limited capabilities)
            logger.warning("No service account provided. Falling back to Project ID initialization.")
            firebase_admin.initialize_app(options={'projectId': settings.FIREBASE_PROJECT_ID})
            
    except Exception as e:
        logger.error(f"CRITICAL: Failed to initialize Firebase Admin: {e}")

# Dependency that provides a database session per request
def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

# Security Scheme for reading the Bearer Token
security = HTTPBearer()

def verify_admin_key(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Protects admin endpoints. 
    Strictly verifies Firebase ID tokens.
    """
    token = credentials.credentials
    
    # Strictly opt for Firebase token verification
    if settings.USE_FIREBASE_AUTH:
        try:
            # Verify the ID token passed from the frontend
            # The Admin SDK verifies the signature, expiration, and audience
            decoded_token = auth.verify_id_token(token)
            print(f"DEBUG: Admin access granted via Firebase user: {decoded_token.get('email')}")
            return True
        except Exception as e:
            print(f"DEBUG: Firebase token verification failed: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid or expired Firebase credentials: {str(e)}",
            )

    # If Firebase auth is disabled (not recommended) but no other method is provided
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Administration credentials missing or authentication disabled",
    )
