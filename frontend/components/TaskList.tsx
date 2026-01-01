import React from 'react';
import { Task } from '../src/types/task';
import Button from '../src/app/components/UI/Button';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new task.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`py-4 transition-all duration-300 ${
            task.is_completed ? 'opacity-70 transform scale-[0.98]' : 'opacity-100'
          }`}
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.is_completed}
              onChange={() => onToggleComplete(task)}
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-600 cursor-pointer"
            />
            <div className="ml-4 flex-1 min-w-0">
              <p
                className={`text-sm font-medium transition-all duration-300 ${
                  task.is_completed
                    ? 'text-gray-500 dark:text-gray-400 line-through'
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                {task.title}
              </p>
              {task.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-all duration-300">{task.description}</p>
              )}
              {task.due_date && (
                <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400 transition-all duration-300">
                  <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-all duration-200"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-all duration-200"
              >
                Delete
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;