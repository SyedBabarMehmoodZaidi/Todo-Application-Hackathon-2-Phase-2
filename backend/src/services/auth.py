from sqlmodel import Session
from src.models.user import User, UserCreate
from src.middleware.auth import get_password_hash, verify_password, authenticate_user
from src.utils.exceptions import UserAlreadyExistsException
from typing import Optional

def create_user(*, session: Session, user_create: UserCreate) -> User:
    """Create a new user with hashed password."""
    # Check if user already exists
    existing_user = session.query(User).filter(User.email == user_create.email).first()
    if existing_user:
        raise UserAlreadyExistsException()

    # Hash the password
    hashed_password = get_password_hash(user_create.password)

    # Create the user
    user = User(
        email=user_create.email,
        username=user_create.username,
        hashed_password=hashed_password
    )

    session.add(user)
    session.commit()
    session.refresh(user)
    return user

def get_user_by_email(*, session: Session, email: str) -> Optional[User]:
    """Get a user by email."""
    return session.query(User).filter(User.email == email).first()

def authenticate_user_service(*, session: Session, email: str, password: str) -> Optional[User]:
    """Authenticate a user by email and password."""
    user = authenticate_user(session, email, password)
    return user