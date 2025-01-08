import React, { useState, useEffect } from 'react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  Category
} from '../services/categoryService';
import MainLayout from '../layouts/MainLayout';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Vui lòng đăng nhập lại!');
      return;
    }
    const fetchCategories = async () => {
      const data = await getCategories(userId);
      const categoriesWithCorrectId = data.map((category: any) => ({
        ...category,
        id: category._id,
      }));
      setCategories(categoriesWithCorrectId);
    };
    fetchCategories();
  }, [refresh]);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setName(category.name);
    setDescription(category.description ?? 'Không có mô tả');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Vui lòng đăng nhập lại!');
      return;
    }

    if (selectedCategory) {
      console.log(selectedCategory.id)
      await updateCategory(selectedCategory.id, { name, description });
    } else {
      await createCategory({ name, description, userId });
    }

    setSelectedCategory(null);
    setName('');
    setDescription('');
    setRefresh(!refresh);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("ID is missing for the category");
      return;
    }

    try {
      await deleteCategory(id);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <MainLayout>
      <h1 className="title">Quản lý danh mục</h1>

      <ul className="breadcrumbs mb-6">
        <li><a href="/home">Trang chủ</a></li>
        <li className="divider">/</li>
        <li><a href="/home" className="active">Danh mục</a></li>
      </ul>

      <div className="mb-6">
        {/* Create Category Button */}
        <button
          onClick={() => {
            setSelectedCategory(null);
            setName('');
            setDescription('');
            setShowModal(true);
          }}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Thêm mới
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
            <h2 className="text-xl font-semibold mb-4">
              {selectedCategory ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="categoryName" className="block text-gray-700 font-medium mb-2">Tên danh mục:</label>
                <input
                  id="categoryName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="categoryDescription" className="block text-gray-700 font-medium mb-2">Mô tả:</label>
                <textarea
                  id="categoryDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-4">
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                  {selectedCategory ? 'Cập nhật' : 'Thêm mới'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition"
                >
                  Đóng
                </button>
              </div>
            </form>

            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div>
      <ul className="space-y-4">
  {categories.map((category) => (
    <li key={category.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-lg shadow-lg hover:from-blue-100 hover:to-green-100 transition-all">
      <div>
        <strong className="text-lg font-semibold text-gray-800">{category.name}</strong>
        <p className="text-sm text-gray-500">{category.description ?? 'Không có mô tả'}</p>
      </div>
      <div className="space-x-4">
        <button
          onClick={() => handleEdit(category)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
        >
          <i className='bx bxs-edit-alt'></i>
        </button>
        <button
          onClick={() => handleDelete(category.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          <i className='bx bxs-trash'></i>
        </button>
      </div>
    </li>
  ))}
</ul>

      </div>
    </MainLayout>
  );
};

export default CategoriesPage;
