from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import Dict
from datetime import timedelta
from pydantic import BaseModel
from ..database import get_session
from ..models.user import User, UserCreate, UserRead
from ..services.auth_service import (
    authenticate_user,
    create_access_token,
    get_user_by_email,
    create_user
)
from ..config import settings
from ..middleware.auth import get_current_user


class UserLogin(BaseModel):
    email: str
    password: str


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=UserRead)
def signup(user_create: UserCreate, session: Session = Depends(get_session)):
    """Register a new user."""
    # Check if user already exists
    existing_user = get_user_by_email(session, user_create.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    user = create_user(session, user_create)
    return user


@router.post("/signin")
def signin(user_login: UserLogin, session: Session = Depends(get_session)):
    """Authenticate user and return access token."""
    user = authenticate_user(
        session, user_login.email, user_login.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user.id),
            "email": user.email,
            "username": user.username,
            "created_at": user.created_at
        }
    }


@router.post("/signout")
def signout():
    """Logout user (client-side token removal)."""
    # In a stateless JWT system, signout is typically handled client-side
    # by removing the token from storage
    return {"message": "Successfully signed out"}


# Additional routes to match frontend expectations
@router.post("/register", response_model=UserRead)
def register(user_create: UserCreate, session: Session = Depends(get_session)):
    """Register a new user (matches signup functionality)."""
    # Check if user already exists
    existing_user = get_user_by_email(session, user_create.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    user = create_user(session, user_create)
    return user


@router.post("/login")
def login(
    email: str = None,
    password: str = None,
    session: Session = Depends(get_session)
):
    """Authenticate user and return access token (accepts form data)."""
    user = authenticate_user(
        session, email, password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user.id),
            "email": user.email,
            "username": user.username,
            "created_at": user.created_at
        }
    }


@router.get("/users/me", response_model=UserRead)
def get_current_user_profile(
    current_user: User = Depends(get_current_user)
):
    """Get the profile of the current authenticated user."""
    return current_user