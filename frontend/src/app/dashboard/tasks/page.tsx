'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../components/AuthProvider';
import { Task, TaskCreate, TaskUpdate, TaskCompletionUpdate } from '../../../types/task';
import TaskList from '../../../../components/TaskList';
import TaskForm from '../../../../components/TaskForm';
import TaskSkeleton from '../../../../components/TaskSkeleton';
import api from '../../../lib/api';

const TasksPage: React.FC = () => {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState('');

  // Load tasks when component mounts
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/api/${user?.id}/tasks`);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error fetching tasks:', err);
    }
  };

  const handleAddTask = async (taskData: TaskCreate) => {
    try {
      const response = await api.post(`/api/${user?.id}/tasks`, taskData);
      setTasks([response.data, ...tasks]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding task:', err);
    }
  };

  const handleUpdateTask = async (taskData: TaskUpdate) => {
    if (!editingTask) return;

    try {
      const response = await api.put(`/api/${user?.id}/tasks/${editingTask.id}`, taskData);
      setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updateData: TaskCompletionUpdate = {
        is_completed: !task.is_completed
      };
      const response = await api.patch(`/api/${user?.id}/tasks/${task.id}/complete`, updateData);
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    } catch (err) {
      setError('Failed to update task status');
      console.error('Error updating task status:', err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await api.delete(`/api/${user?.id}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    window.location.href = '/auth/sign-in';
    return null;
  }

  const [isLoading, setIsLoading] = useState(false);

  // Load tasks when component mounts
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/${user?.id}/tasks`);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (taskData: TaskCreate) => {
    try {
      setIsLoading(true);
      const response = await api.post(`/api/${user?.id}/tasks`, taskData);
      setTasks([response.data, ...tasks]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (taskData: TaskUpdate) => {
    if (!editingTask) return;

    try {
      setIsLoading(true);
      const response = await api.put(`/api/${user?.id}/tasks/${editingTask.id}`, taskData);
      setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      setIsLoading(true);
      const updateData: TaskCompletionUpdate = {
        is_completed: !task.is_completed
      };
      const response = await api.patch(`/api/${user?.id}/tasks/${task.id}/complete`, updateData);
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    } catch (err) {
      setError('Failed to update task status');
      console.error('Error updating task status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setIsLoading(true);
      await api.delete(`/api/${user?.id}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 transition-all duration-500">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-500">Your Tasks</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-all duration-700 delay-100">Manage your personal todo list</p>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded relative mb-4 transition-all duration-500" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="mb-6 transition-all duration-700 delay-200">
        <button
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </>
          ) : (
            'Add New Task'
          )}
        </button>
      </div>

      {showForm ? (
        <div className="mb-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h2>
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
            isEditing={!!editingTask}
          />
        </div>
      ) : null}

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md hover:shadow-md transition-all duration-300">
        {isLoading ? (
          <div className="p-6">
            <TaskSkeleton count={5} />
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        )}
      </div>
    </div>
  );
};

export default TasksPage;