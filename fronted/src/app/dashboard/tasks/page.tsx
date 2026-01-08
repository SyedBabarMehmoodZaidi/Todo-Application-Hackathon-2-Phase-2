'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../components/AuthProvider';
import { Task, TaskCreate, TaskUpdate, TaskCompletionUpdate } from '../../../types/task';
import TaskList from '../../../../components/TaskList';
import TaskForm from '../../../../components/TaskForm';
import TaskSkeleton from '../../../../components/TaskSkeleton';
import { apiClient } from '../../../lib/api'; 

const TasksPage: React.FC = () => {
  const { user, loading } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fetch tasks once user is available
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  // ✅ SINGLE fetchTasks using apiClient
  const fetchTasks = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await apiClient.getUserTasks(user.id); // ✅ use getUserTasks
      setTasks(response.data || []);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (taskData: TaskCreate) => {
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await apiClient.createTodo(taskData); // ✅ createTodo
      setTasks(prev => [response.data, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (taskData: TaskUpdate) => {
    if (!editingTask) return;

    try {
      setIsLoading(true);
      const response = await apiClient.updateTodo(editingTask.id, taskData); // ✅ updateTodo
      setTasks(prev => prev.map(task => (task.id === editingTask.id ? response.data : task)));
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      setIsLoading(true);
      const updateData: TaskCompletionUpdate = { is_completed: !task.is_completed };
      const response = await apiClient.toggleTodoCompletion(task.id, !task.is_completed); // ✅ toggleTodoCompletion
      setTasks(prev => prev.map(t => (t.id === task.id ? response.data : t)));
    } catch (err) {
      setError('Failed to update task status');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      setIsLoading(true);
      await apiClient.deleteTodo(taskId); // ✅ deleteTodo
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // 🔐 Auth guards
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    window.location.href = '/auth/sign-in';
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <p className="text-sm text-gray-500">Manage your personal todo list</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <button
        onClick={() => {
          setEditingTask(null);
          setShowForm(true);
        }}
        disabled={isLoading}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        Add New Task
      </button>

      {showForm && (
        <div className="mb-8 bg-white shadow rounded p-6">
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
      )}

      <div className="bg-white shadow rounded">
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
