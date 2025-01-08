import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory, Category } from '../services/categoryService';

const CategoryList: React.FC<{ onEdit: (category: Category) => void }> = ({ onEdit }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div>
      <h2>Danh sách danh mục</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <strong>{category.name}</strong> - {category.description || 'Không có mô tả'}
            <button onClick={() => onEdit(category)}>Sửa</button>
            <button onClick={() => handleDelete(category.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
