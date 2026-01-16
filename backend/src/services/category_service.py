from sqlmodel import Session, select
from typing import List
from uuid import UUID
from ..models.category import Category, CategoryCreate, CategoryUpdate
from ..models.user import User


def create_category_for_user(session: Session, category_create: CategoryCreate, user_id: str) -> Category:
    """Create a new category for a specific user."""
    # Validate user_id format
    try:
        UUID(user_id)
    except ValueError:
        raise ValueError("Invalid user ID format")

    # Verify user exists
    user = session.get(User, user_id)
    if not user:
        raise ValueError("User not found")

    # Create category - exclude user_id from input data since we set it separately
    category_data = category_create.dict(exclude={'user_id'})
    category = Category(
        **category_data,
        user_id=user_id
    )
    session.add(category)
    session.commit()
    session.refresh(category)
    return category


def get_categories_for_user(session: Session, user_id: str) -> List[Category]:
    """Get all categories for a specific user."""
    statement = select(Category).where(Category.user_id == user_id)
    categories = session.exec(statement).all()
    return categories


def get_category_by_id(session: Session, category_id: str, user_id: str) -> Category:
    """Get a specific category by ID for a specific user."""
    try:
        UUID(category_id)
        UUID(user_id)
    except ValueError:
        raise ValueError("Invalid ID format")

    statement = select(Category).where(
        Category.id == category_id,
        Category.user_id == user_id
    )
    category = session.exec(statement).first()
    return category


def update_category_for_user(session: Session, category_id: str, category_update: CategoryUpdate, user_id: str) -> Category:
    """Update a specific category by ID for a specific user."""
    try:
        UUID(category_id)
        UUID(user_id)
    except ValueError:
        raise ValueError("Invalid ID format")

    statement = select(Category).where(
        Category.id == category_id,
        Category.user_id == user_id
    )
    category = session.exec(statement).first()

    if not category:
        return None

    update_data = category_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(category, field, value)

    session.add(category)
    session.commit()
    session.refresh(category)
    return category


def delete_category_for_user(session: Session, category_id: str, user_id: str) -> bool:
    """Delete a specific category by ID for a specific user."""
    try:
        UUID(category_id)
        UUID(user_id)
    except ValueError:
        raise ValueError("Invalid ID format")

    statement = select(Category).where(
        Category.id == category_id,
        Category.user_id == user_id
    )
    category = session.exec(statement).first()

    if not category:
        return False

    session.delete(category)
    session.commit()
    return True