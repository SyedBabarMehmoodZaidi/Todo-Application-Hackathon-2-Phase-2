from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from src.database import get_session
from src.models.user import UserCreate, UserRead
from src.services.auth import create_user, authenticate_user_service
from src.middleware.auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta
from typing import Dict

router = APIRouter()

@router.post("/auth/register", response_model=UserRead)
def register(user_create: UserCreate, session: Session = Depends(get_session)):
    """Register a new user."""
    try:
        user = create_user(session=session, user_create=user_create)
        return user
    except Exception as e:
        raise e

@router.post("/auth/login")
def login(email: str, password: str, session: Session = Depends(get_session)):
    """Login a user and return access token."""
    user = authenticate_user_service(session=session, email=email, password=password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username
        }
    }