from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
from datetime import datetime
from ..database import get_session
from ..models.task import Task, TaskCreate, TaskUpdate, TaskRead
from ..services.task_service import (
    get_tasks_for_user,
    get_task_by_id,
    create_task_for_user,
    update_task_for_user,
    delete_task_for_user,
    update_task_completion_status
)
from ..middleware.auth import get_current_user
from ..models.user import User

router = APIRouter(tags=["Tasks"])


@router.get("/tasks", response_model=List[Task])
def get_my_tasks(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
    completed: bool = None,
    due_date_start: str = None,
    due_date_end: str = None,
    sort_by: str = "created_at",
    sort_order: str = "desc"
):
    """Get all tasks for the authenticated user with optional filters."""
    # Call the service with the authenticated user's ID and filters
    statement = select(Task).where(Task.user_id == current_user.id)

    # Apply filters if provided
    if completed is not None:
        statement = statement.where(Task.completed == completed)
    if due_date_start:
        try:
            start_date = datetime.fromisoformat(due_date_start.replace('Z', '+00:00'))
            statement = statement.where(Task.due_date >= start_date)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid due_date_start format"
            )
    if due_date_end:
        try:
            end_date = datetime.fromisoformat(due_date_end.replace('Z', '+00:00'))
            statement = statement.where(Task.due_date <= end_date)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid due_date_end format"
            )

    # Apply sorting
    if sort_by == "due_date":
        if sort_order == "asc":
            statement = statement.order_by(Task.due_date.asc())
        else:
            statement = statement.order_by(Task.due_date.desc())
    elif sort_by == "title":
        if sort_order == "asc":
            statement = statement.order_by(Task.title.asc())
        else:
            statement = statement.order_by(Task.title.desc())
    else:  # sort_by == "created_at"
        if sort_order == "asc":
            statement = statement.order_by(Task.created_at.asc())
        else:
            statement = statement.order_by(Task.created_at.desc())

    tasks = session.exec(statement).all()
    return tasks


@router.get("/users/{user_id}/tasks", response_model=List[Task])
def get_tasks(user_id: str, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """Get all tasks for a specific user."""
    # Verify user exists and is authorized
    if str(current_user.id) != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot access other user's tasks"
        )

    tasks = get_tasks_for_user(session, user_id)
    return tasks


@router.post("/tasks", response_model=Task)
def create_task(task_create: TaskCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """Create a new task for the authenticated user."""
    task = create_task_for_user(session, task_create, str(current_user.id))
    return task


@router.get("/tasks/{task_id}", response_model=Task)
def get_task(task_id: str, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """Get a specific task for the authenticated user."""
    task = get_task_by_id(session, task_id, str(current_user.id))
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


@router.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: str, task_update: TaskUpdate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """Update a specific task for the authenticated user."""
    task = update_task_for_user(session, task_id, task_update, str(current_user.id))
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not owned by user"
        )

    return task


@router.delete("/tasks/{task_id}")
def delete_task(task_id: str, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """Delete a specific task for the authenticated user."""
    success = delete_task_for_user(session, task_id, str(current_user.id))
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not owned by user"
        )

    return {"message": "Task deleted successfully"}


@router.patch("/tasks/{task_id}/complete", response_model=Task)
def update_task_completion(task_id: str, completed: bool, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    """Update the completion status of a specific task for the authenticated user."""
    task = update_task_completion_status(session, task_id, completed, str(current_user.id))
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or not owned by user"
        )

    return task