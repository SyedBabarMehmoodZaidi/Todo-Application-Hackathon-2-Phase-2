import React, { useState } from 'react';
import { TaskCreate, TaskUpdate } from '../src/types/task';
import Input from '../src/app/components/UI/Input';
import Button from '../src/app/components/UI/Button';

interface TaskFormProps {
  task?: TaskCreate | TaskUpdate;
  onSubmit: (task: TaskCreate | TaskUpdate) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, isEditing = false }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.due_date || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData: TaskCreate | TaskUpdate = {
      title,
      description: description || undefined,
      due_date: dueDate || undefined,
    };
    onSubmit(taskData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        id="title"
        name="title"
        type="text"
        label="Task Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Enter task title"
      />

      <Input
        id="description"
        name="description"
        type="textarea"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description (optional)"
      />

      <Input
        id="dueDate"
        name="dueDate"
        type="date"
        label="Due Date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
        >
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;