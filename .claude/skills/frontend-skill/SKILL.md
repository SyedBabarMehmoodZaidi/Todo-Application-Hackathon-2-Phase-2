---
name: frontend-skill
description: Build pages, components, layouts, and apply styling for web applications. Use for Todo app or general frontend development.
---

# Frontend Skill – Pages, Components, Layout, Styling

## Instructions

1. **Page Structure**
   - Organize pages using Next.js App Router (`app/` directory)
   - Use server/client components correctly
   - Include loading, error, and empty states

2. **Component Design**
   - Create reusable React components for UI elements (buttons, lists, forms)
   - Maintain clean separation of concerns
   - Handle component state efficiently

3. **Layout and Styling**
   - Implement responsive, mobile-first layouts
   - Use Tailwind CSS, CSS Modules, or plain CSS
   - Apply consistent spacing, typography, and color schemes
   - Ensure accessibility (contrast, focus states, semantic HTML)

4. **Interactivity**
   - Handle user inputs (forms, buttons, toggles)
   - Implement dynamic list updates (add, edit, delete todos)
   - Provide visual feedback (loading spinners, success/error messages)

## Best Practices
- Keep components small and reusable
- Avoid inline styles where possible
- Follow Next.js conventions for routing and layout
- Prioritize readability and maintainability
- Optimize rendering and prevent unnecessary re-renders

## Example Structure
```tsx
// app/todos/page.tsx
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

export default function TodosPage() {
  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Todos</h1>
      <TodoForm />
      <TodoList />
    </main>
  );
}
