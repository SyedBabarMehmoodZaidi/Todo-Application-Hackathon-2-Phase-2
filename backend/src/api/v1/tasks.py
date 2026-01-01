from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List, Optional
from src.database import get_session
from src.models.task import Task, TaskCreate, TaskRead, TaskUpdate, TaskCompletionUpdate
from src.services.task_service import (
    create_task, get_tasks, get_task, update_task, update_task_completion, delete_task
)
from src.api.deps import get_current_active_user, get_user_id_from_token
from src.models.user import User

router = APIRouter()

@router.get("/{user_id}/tasks", response_model=List[TaskRead])
def read_tasks(
    user_id: str,
    completed: Optional[bool] = None,
    current_user_id: str = Depends(get_user_id_from_token),
    session: Session = Depends(get_session)
):
    """Get all tasks for a specific user."""
    # Ensure user can only access their own tasks
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access these tasks")

    tasks = get_tasks(session=session, user_id=user_id, completed=completed)
    return tasks

@router.post("/{user_id}/tasks", response_model=TaskRead)
def create_task_endpoint(
    user_id: str,
    task_create: TaskCreate,
    current_user_id: str = Depends(get_user_id_from_token),
    session: Session = Depends(get_session)
):
    """Create a new task for a specific user."""
    # Ensure user can only create tasks for themselves
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to create tasks for this user")

    task = create_task(session=session, task_create=task_create, user_id=user_id)
    return task

@router.get("/{user_id}/tasks/{id}", response_model=TaskRead)
def read_task(
    user_id: str,
    id: str,
    current_user_id: str = Depends(get_user_id_from_token),
    session: Session = Depends(get_session)
):
    """Get a specific task by ID for a specific user."""
    # Ensure user can only access their own tasks
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access these tasks")

    task = get_task(session=session, task_id=id, user_id=user_id)
    return task

@router.put("/{user_id}/tasks/{id}", response_model=TaskRead)
def update_task_endpoint(
    user_id: str,
    id: str,
    task_update: TaskUpdate,
    current_user_id: str = Depends(get_user_id_from_token),
    session: Session = Depends(get_session)
):
    """Update a specific task by ID for a specific user."""
    # Ensure user can only update their own tasks
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")

    task = update_task(session=session, task_id=id, task_update=task_update, user_id=user_id)
    return task

@router.delete("/{user_id}/tasks/{id}")
def delete_task_endpoint(
    user_id: str,
    id: str,
    current_user_id: str = Depends(get_user_id_from_token),
    session: Session = Depends(get_session)
):
    """Delete a specific task by ID for a specific user."""
    # Ensure user can only delete their own tasks
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this task")

    delete_task(session=session, task_id=id, user_id=user_id)
    return {"message": "Task deleted successfully"}

@router.patch("/{user_id}/tasks/{id}/complete", response_model=TaskRead)
def update_task_completion_endpoint(
    user_id: str,
    id: str,
    completion_update: TaskCompletionUpdate,
    current_user_id: str = Depends(get_user_id_from_token),
    session: Session = Depends(get_session)
):
    """Update the completion status of a specific task by ID for a specific user."""
    # Ensure user can only update their own tasks
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")

    task = update_task_completion(
        session=session,
        task_id=id,
        completion_update=completion_update,
        user_id=user_id
    )
    return task