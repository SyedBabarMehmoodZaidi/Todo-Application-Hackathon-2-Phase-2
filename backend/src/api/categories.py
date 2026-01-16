from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import List
from uuid import UUID
from ..database import get_session
from ..models.category import Category, CategoryCreate, CategoryUpdate, CategoryRead
from ..services.category_service import (
    create_category_for_user,
    get_categories_for_user,
    get_category_by_id,
    update_category_for_user,
    delete_category_for_user
)
from ..middleware.auth import get_current_user
from ..models.user import User

router = APIRouter(tags=["Categories"])


@router.get("/categories", response_model=List[CategoryRead])
def get_my_categories(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """Get all categories for the authenticated user."""
    categories = get_categories_for_user(session, str(current_user.id))
    return categories


@router.post("/categories", response_model=CategoryRead)
def create_category(category_create: CategoryCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """Create a new category for the authenticated user."""
    category = create_category_for_user(session, category_create, str(current_user.id))
    return category


@router.get("/categories/{id}", response_model=CategoryRead)
def get_category(id: str, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """Get a specific category for the authenticated user."""
    # Validate UUID format
    try:
        UUID(id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid category ID format"
        )

    category = get_category_by_id(session, id, str(current_user.id))
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )

    return category


@router.put("/categories/{id}", response_model=CategoryRead)
def update_category(id: str, category_update: CategoryUpdate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """Update a specific category for the authenticated user."""
    # Validate UUID format
    try:
        UUID(id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid category ID format"
        )

    category = update_category_for_user(session, id, category_update, str(current_user.id))
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found or not owned by user"
        )

    return category


@router.delete("/categories/{id}")
def delete_category(id: str, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """Delete a specific category for the authenticated user."""
    # Validate UUID format
    try:
        UUID(id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid category ID format"
        )

    success = delete_category_for_user(session, id, str(current_user.id))
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found or not owned by user"
        )

    return {"message": "Category deleted successfully"}