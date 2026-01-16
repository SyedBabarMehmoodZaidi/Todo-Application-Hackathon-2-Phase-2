from sqlmodel import Session, select
from typing import List, Optional
from ..models.task import Task, TaskCreate, TaskUpdate, StatusEnum
from ..models.user import User
from datetime import datetime, timezone
import uuid


def get_tasks_for_user(session: Session, user_id: str) -> List[Task]:
    """Get all tasks for a specific user."""
    try:
        user_uuid = uuid.UUID(user_id)
        statement = select(Task).where(Task.user_id == user_uuid)
        return session.exec(statement).all()
    except ValueError:
        # Invalid UUID format
        return []


def get_task_by_id(session: Session, task_id: str, user_id: str) -> Optional[Task]:
    """Get a specific task by ID for a specific user."""
    try:
        task_uuid = uuid.UUID(task_id)
        user_uuid = uuid.UUID(user_id)
        statement = select(Task).where(Task.id == task_uuid, Task.user_id == user_uuid)
        return session.exec(statement).first()
    except ValueError:
        # Invalid UUID format
        return None


def create_task_for_user(session: Session, task_create: TaskCreate, user_id: str) -> Task:
    """Create a new task for a specific user."""
    try:
        user_uuid = uuid.UUID(user_id)
        # Create task with the provided data plus the user_id
        task_data = task_create.model_dump()
        task_data['user_id'] = user_uuid
        db_task = Task(**task_data)
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task
    except ValueError:
        # Invalid UUID format
        raise ValueError("Invalid user ID format")


def update_task_for_user(session: Session, task_id: str, task_update: TaskUpdate, user_id: str) -> Optional[Task]:
    """Update a specific task for a specific user."""
    try:
        task_uuid = uuid.UUID(task_id)
        user_uuid = uuid.UUID(user_id)
        db_task = session.get(Task, task_uuid)
        if db_task and db_task.user_id == user_uuid:
            update_data = task_update.model_dump(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_task, field, value)
            db_task.updated_at = datetime.now(timezone.utc)
            session.add(db_task)
            session.commit()
            session.refresh(db_task)
            return db_task
        return None
    except ValueError:
        # Invalid UUID format
        return None


def delete_task_for_user(session: Session, task_id: str, user_id: str) -> bool:
    """Delete a specific task for a specific user."""
    try:
        task_uuid = uuid.UUID(task_id)
        user_uuid = uuid.UUID(user_id)
        db_task = session.get(Task, task_uuid)
        if db_task and db_task.user_id == user_uuid:
            session.delete(db_task)
            session.commit()
            return True
        return False
    except ValueError:
        # Invalid UUID format
        return False


def update_task_completion_status(session: Session, task_id: str, completed: bool, user_id: str) -> Optional[Task]:
    """Update the completion status of a specific task for a specific user."""
    try:
        task_uuid = uuid.UUID(task_id)
        user_uuid = uuid.UUID(user_id)
        db_task = session.get(Task, task_uuid)
        if db_task and db_task.user_id == user_uuid:
            db_task.completed = completed
            # Update status based on completion
            db_task.status = StatusEnum.completed if completed else StatusEnum.pending
            db_task.updated_at = datetime.now(timezone.utc)
            session.add(db_task)
            session.commit()
            session.refresh(db_task)
            return db_task
        return None
    except ValueError:
        # Invalid UUID format
        return None