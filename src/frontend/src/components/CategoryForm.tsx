import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory, Category } from '../services/categoryService';

const CategoryForm: React.FC<{ selectedCategory?: Category; onSuccess: () => void }> = ({ selectedCategory, onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
      setDescription(selectedCategory.description || '');
    }
  }, [selectedCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCategory) {
      await updateCategory(selectedCategory.id, { name, description });
    } else {
      await createCategory({ name, description, userId: 'yourUserIdHere' }); // Thay `userId` bằng ID thực tế
    }

    setName('');
    setDescription('');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedCategory ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}</h2>
      <div>
        <label>Tên danh mục:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mô tả:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">{selectedCategory ? 'Cập nhật' : 'Thêm mới'}</button>
    </form>
  );
};

export default CategoryForm;
