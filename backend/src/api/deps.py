from fastapi import Depends, HTTPException
from sqlmodel import Session
from src.database import get_session
from src.middleware.auth import get_current_user
from src.models.user import User

async def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    """Get the current active user, raising an exception if the user is not active."""
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def get_user_id_from_token(current_user: User = Depends(get_current_user)) -> str:
    """Extract user ID from the JWT token via the current user dependency."""
    return str(current_user.id)