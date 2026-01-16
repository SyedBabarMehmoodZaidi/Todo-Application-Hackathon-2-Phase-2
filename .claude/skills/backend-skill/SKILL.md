---
name: backend-skill
description: Generate backend routes, handle requests and responses, and connect to databases. Use for building API endpoints and server logic.
---

# Backend Skill

## Instructions

1. **Routing**
   - Define RESTful API routes (GET, POST, PUT, DELETE)
   - Use proper URL structure and route naming
   - Handle dynamic route parameters

2. **Request & Response Handling**
   - Parse request body and query parameters
   - Validate input data
   - Return structured JSON responses
   - Handle errors with proper HTTP status codes

3. **Database Integration**
   - Connect to databases (SQL or NoSQL)
   - Perform CRUD operations
   - Ensure secure queries and avoid injection
   - Handle database connection errors

4. **Server Best Practices**
   - Keep endpoints focused and modular
   - Use middleware for authentication, logging, etc.
   - Implement proper error handling
   - Follow clean code and separation of concerns

## Example Structure
```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class TodoItem(BaseModel):
    title: str
    completed: bool = False

todos = []

@app.get("/todos")
def get_todos():
    return todos

@app.post("/todos")
def create_todo(item: TodoItem):
    todos.append(item)
    return item
