from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, Optional, List
from datetime import datetime
from uuid import UUID, uuid4

if TYPE_CHECKING:
    from .user import User


class CategoryBase(SQLModel):
    name: str = Field(min_length=1, max_length=100)
    color: Optional[str] = Field(default="#000000")  # Hex color code
    user_id: UUID = Field(foreign_key="user.id")


class Category(CategoryBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    user: Optional["User"] = Relationship(back_populates="categories")


class CategoryCreate(SQLModel):
    name: str = Field(min_length=1, max_length=100)
    color: Optional[str] = Field(default="#000000")  # Hex color code


class CategoryRead(CategoryBase):
    id: UUID
    created_at: datetime
    updated_at: datetime


class CategoryUpdate(SQLModel):
    name: Optional[str] = None
    color: Optional[str] = None