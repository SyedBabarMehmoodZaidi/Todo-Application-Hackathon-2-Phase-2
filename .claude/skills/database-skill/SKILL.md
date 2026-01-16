---
name: database-skill
description: Design database schemas, create tables, and manage migrations. Use for backend data management.
---

# Database Skill

## Instructions

1. **Schema Design**
   - Define tables with clear relationships
   - Use appropriate data types
   - Normalize where necessary for efficiency
   - Include primary keys and indexes for performance

2. **Migrations**
   - Write migrations for schema changes
   - Ensure backward compatibility
   - Track version history of database changes

3. **Data Integrity**
   - Apply constraints (unique, not null, foreign key)
   - Use transactions for multi-step operations
   - Maintain referential integrity

## Best Practices
- Keep table and column names consistent and descriptive
- Avoid redundant data storage
- Optimize for query performance
- Document schema changes clearly
- Ensure migrations are idempotent

## Example Structure
```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Todos table
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
