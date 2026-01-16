import React, { useState, useEffect } from 'react';
import { Category } from '../../src/types/task';
import { apiClient } from '../src/lib/api';
import { useAuth } from './AuthProvider';

interface CategoryManagerProps {
  selectedCategoryIds: string[];
  setSelectedCategoryIds: (ids: string[]) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  selectedCategoryIds,
  setSelectedCategoryIds,
  categories,
  setCategories
}) => {
  const { user } = useAuth();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3B82F6'); // Default blue
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

  const fetchCategories = async () => {
    if (!user) return;

    try {
      const response = await apiClient.getUserCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]);

  const handleCreateCategory = async () => {
    if (!user || !newCategoryName.trim()) return;

    try {
      const response = await apiClient.createCategory({
        name: newCategoryName.trim(),
        color: newCategoryColor
      });

      if (response.success && response.data) {
        setCategories(prev => [...prev, response.data]);
        setNewCategoryName('');
        setShowNewCategoryForm(false);
      }
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategoryIds(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Categories</h3>
        <button
          type="button"
          onClick={() => setShowNewCategoryForm(!showNewCategoryForm)}
          className="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {showNewCategoryForm ? 'Cancel' : '+ New'}
        </button>
      </div>

      {showNewCategoryForm && (
        <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white px-3 py-1 text-sm mb-2"
            maxLength={100}
          />
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={newCategoryColor}
              onChange={(e) => setNewCategoryColor(e.target.value)}
              className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">Color</span>
            <button
              type="button"
              onClick={handleCreateCategory}
              className="ml-auto px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
            >
              Create
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleCategoryToggle(category.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              selectedCategoryIds.includes(category.id)
                ? 'bg-opacity-100 text-white border-transparent'
                : 'bg-opacity-20 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
            }`}
            style={{
              backgroundColor: selectedCategoryIds.includes(category.id) ? category.color : 'transparent',
              borderColor: selectedCategoryIds.includes(category.id) ? category.color : undefined
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;