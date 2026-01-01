from sqlmodel import Session, select
from typing import List, Optional
from src.models.task import Task, TaskCreate, TaskUpdate, TaskCompletionUpdate
from src.models.user import User
from src.utils.exceptions import TaskNotFoundException, UnauthorizedAccessException

def create_task(*, session: Session, task_create: TaskCreate, user_id: str) -> Task:
    """Create a new task for a specific user."""
    task = Task.from_orm(task_create)
    task.user_id = user_id
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def get_tasks(*, session: Session, user_id: str, completed: Optional[bool] = None) -> List[Task]:
    """Get all tasks for a specific user, optionally filtered by completion status."""
    query = select(Task).where(Task.user_id == user_id)
    if completed is not None:
        query = query.where(Task.is_completed == completed)
    query = query.order_by(Task.created_at.desc())
    return session.exec(query).all()

def get_task(*, session: Session, task_id: str, user_id: str) -> Task:
    """Get a specific task by ID for a specific user."""
    task = session.get(Task, task_id)
    if not task:
        raise TaskNotFoundException()
    if str(task.user_id) != user_id:
        raise UnauthorizedAccessException()
    return task

def update_task(*, session: Session, task_id: str, task_update: TaskUpdate, user_id: str) -> Task:
    """Update a specific task by ID for a specific user."""
    task = session.get(Task, task_id)
    if not task:
        raise TaskNotFoundException()
    if str(task.user_id) != user_id:
        raise UnauthorizedAccessException()

    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def update_task_completion(*, session: Session, task_id: str, completion_update: TaskCompletionUpdate, user_id: str) -> Task:
    """Update the completion status of a specific task by ID for a specific user."""
    task = session.get(Task, task_id)
    if not task:
        raise TaskNotFoundException()
    if str(task.user_id) != user_id:
        raise UnauthorizedAccessException()

    task.is_completed = completion_update.is_completed

    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def delete_task(*, session: Session, task_id: str, user_id: str) -> None:
    """Delete a specific task by ID for a specific user."""
    task = session.get(Task, task_id)
    if not task:
        raise TaskNotFoundException()
    if str(task.user_id) != user_id:
        raise UnauthorizedAccessException()

    session.delete(task)
    session.commit()