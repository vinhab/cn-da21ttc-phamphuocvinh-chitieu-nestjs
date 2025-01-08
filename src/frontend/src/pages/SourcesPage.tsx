import React, { useState, useEffect } from 'react';
import {
  getSources,
  createSource,
  updateSource,
  deleteSource,
  Source
} from '../services/sourceService';
import MainLayout from '../layouts/MainLayout';

const SourcesPage: React.FC = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
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
    const fetchSources = async () => {
      const data = await getSources(userId);
      const sourcesWithCorrectId = data.map((source: any) => ({
        ...source,
        id: source._id,
      }));
      setSources(sourcesWithCorrectId);
    };
    fetchSources();
  }, [refresh]);

  const handleEdit = (source: Source) => {
    setSelectedSource(source);
    setName(source.name);
    setDescription(source.description ?? 'Không có mô tả');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Vui lòng đăng nhập lại!');
      return;
    }

    if (selectedSource) {
      console.log(selectedSource.id)
      await updateSource(selectedSource.id, { name, description });
    } else {
      await createSource({ name, description, userId });
    }

    setSelectedSource(null);
    setName('');
    setDescription('');
    setRefresh(!refresh);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("ID is missing for the source");
      return;
    }

    try {
      await deleteSource(id);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Failed to delete source:', error);
    }
  };

  return (
    <MainLayout>
      <h1 className="title">Quản lý nguồn thu nhập</h1>

      <ul className="breadcrumbs mb-6">
        <li><a href="/home">Trang chủ</a></li>
        <li className="divider">/</li>
        <li><a href="/home" className="active">Nguồn thu nhập</a></li>
      </ul>

      <div className="mb-6">
        {/* Create source Button */}
        <button
          onClick={() => {
            setSelectedSource(null);
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
              {selectedSource ? 'Cập nhật nguồn thu nhập' : 'Thêm nguồn thu nhập mới'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="sourceName" className="block text-gray-700 font-medium mb-2">Tên nguồn thu nhập:</label>
                <input
                  id="sourceName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="sourceDescription" className="block text-gray-700 font-medium mb-2">Mô tả:</label>
                <textarea
                  id="sourceDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-4">
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                  {selectedSource ? 'Cập nhật' : 'Thêm mới'}
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
          {sources.map((source) => (
            <li key={source.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-gray-200 rounded-lg shadow-md hover:from-blue-100 hover:to-green-100 transition-all">
              <div>
                <strong className="text-lg font-semibold text-gray-800">{source.name}</strong>
                <p className="text-sm text-gray-600">{source.description ?? 'Không có mô tả'}</p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => handleEdit(source)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
                >
                  <i className='bx bxs-edit-alt'></i>
                </button>
                <button
                  onClick={() => handleDelete(source.id)}
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

export default SourcesPage;
