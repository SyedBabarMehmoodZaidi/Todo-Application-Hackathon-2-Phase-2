'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../components/AuthProvider';
import { useNotification } from '../../../../components/NotificationProvider';
import { Task, TaskCreate, TaskUpdate, TaskCompletionUpdate } from '../../../types/task';
import TaskList from '../../../../components/TaskList';
import TaskForm from '../../../../components/TaskForm';
import TaskFilters from '../../../../components/TaskFilters';
import TaskSkeleton from '../../../../components/TaskSkeleton';
import { apiClient } from "../../../lib/api";


const TasksPage: React.FC = () => {
  const { user, loading } = useAuth();
  const { showNotification } = useNotification();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort state
  const [completedFilter, setCompletedFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [dueDateStart, setDueDateStart] = useState<string>('');
  const [dueDateEnd, setDueDateEnd] = useState<string>('');
  const [sortBy, setSortBy] = useState<'created_at' | 'due_date' | 'title'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // ✅ Fetch tasks once user is available
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, completedFilter, dueDateStart, dueDateEnd, sortBy, sortOrder]);

  // ✅ SINGLE fetchTasks using apiClient with filters
  const fetchTasks = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await apiClient.getUserTasks({
        completed: completedFilter === 'completed' ? true : completedFilter === 'pending' ? false : undefined,
        due_date_start: dueDateStart || undefined,
        due_date_end: dueDateEnd || undefined,
        sort_by: sortBy,
        sort_order: sortOrder
      }); // ✅ use getUserTasks with filters
      if (response.success) {
        setTasks(response.data || []);
      } else {
        throw new Error(response.error || 'Failed to load tasks');
      }
    } catch (err) {
      showNotification('error', 'Failed to load tasks. Please try again.');
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
      if (response.success && response.data) {
        setTasks(prev => [response.data, ...prev]);
      } else {
        throw new Error(response.error || 'Failed to add task');
      }
      setShowForm(false);
      showNotification('success', 'Task added successfully!');
    } catch (err) {
      showNotification('error', 'Failed to add task. Please try again.');
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
      if (response.success && response.data) {
        setTasks(prev => prev.map(task => (task.id === editingTask.id ? response.data : task)));
      } else {
        throw new Error(response.error || 'Failed to update task');
      }
      setEditingTask(null);
      setShowForm(false);
      showNotification('success', 'Task updated successfully!');
    } catch (err) {
      showNotification('error', 'Failed to update task. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      setIsLoading(true);
      const updateData: TaskCompletionUpdate = { completed: !task.completed };
      const response = await apiClient.toggleTodoCompletion(task.id, !task.completed); // ✅ toggleTodoCompletion
      if (response.success && response.data) {
        setTasks(prev => prev.map(t => (t.id === task.id ? response.data : t)));
      } else {
        throw new Error(response.error || 'Failed to update task status');
      }
      showNotification('success', `Task marked as ${!task.completed ? 'completed' : 'pending'}!`);
    } catch (err) {
      showNotification('error', 'Failed to update task status. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      setIsLoading(true);
      const response = await apiClient.deleteTodo(taskId); // ✅ deleteTodo
      if (response.success) {
        setTasks(prev => prev.filter(task => task.id !== taskId));
      } else {
        throw new Error(response.error || 'Failed to delete task');
      }
      showNotification('success', 'Task deleted successfully!');
    } catch (err) {
      showNotification('error', 'Failed to delete task. Please try again.');
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <p className="text-sm text-gray-500">Manage your personal todo list</p>
      </div>

      <TaskFilters
        completedFilter={completedFilter}
        setCompletedFilter={setCompletedFilter}
        dueDateStart={dueDateStart}
        setDueDateStart={setDueDateStart}
        dueDateEnd={dueDateEnd}
        setDueDateEnd={setDueDateEnd}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

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
