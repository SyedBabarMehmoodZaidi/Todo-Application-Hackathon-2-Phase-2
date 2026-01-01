import React from 'react';
import { Task } from '../src/types/task';
import Button from '../src/app/components/UI/Button';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete, onEdit }) => {
  return (
    <li className="py-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={() => onToggleComplete(task)}
          className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <div className="ml-4 flex-1 min-w-0">
          <p
            className={`text-sm font-medium ${
              task.is_completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
          )}
          {task.due_date && (
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Due: {new Date(task.due_date).toLocaleDateString()}
            </div>
          )}
        </div>
        <div className="ml-4 flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;