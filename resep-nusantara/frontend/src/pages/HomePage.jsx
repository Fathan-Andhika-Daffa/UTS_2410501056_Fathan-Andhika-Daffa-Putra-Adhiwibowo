import { useState } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import { resepAPI } from '../services/api';
import { RecipeCard } from '../components/RecipeCard';
import { FilterBar } from '../components/FilterBar';
import { Pagination } from '../components/Pagination';
import { Modal } from '../components/Modal';
import { RecipeForm } from '../components/RecipeForm';

export function HomePage() {
  const { recipes, loading, pagination, filters, updateFilter, changePage, refetch } = useRecipes();
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleAddRecipe = async (formData) => {
    try {
      await resepAPI.create(formData);
      setShowModal(false);
      setFeedback({ type: 'success', msg: 'Resep berhasil disimpan!' });
      refetch();
    } catch (err) {
      setFeedback({ type: 'error', msg: err.response?.data?.errors?.join(', ') || err.message });
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="container" style={{ margin: '3% 5% 0 5%' }}>
      <header className="page-header">
        <div className="header-content">
          <h1>Resep Nusantara</h1>
        </div>
      </header>

      <section className="filter-section">
        <FilterBar 
          filters={filters} 
          onFilterChange={updateFilter} 
          total={pagination.total} 
        />
      </section>

      <main className="recipe-grid">
        {loading ? (
          <div className="loading-state">
            <p>Memuat data resep...</p>
          </div>
        ) : (
          recipes.map(r => <RecipeCard key={r.id} recipe={r} />)
        )}
      </main>

      <footer className="page-footer">
        <Pagination pagination={pagination} onPageChange={changePage} />
          <button className="btn-add" onClick={() => setShowModal(true)}>
            + Tambah Resep
          </button>
      </footer>

      <Modal 
        isOpen={showModal} 
        title='Form Tambah Resep' 
        onClose={() => setShowModal(false)}
      >
        <RecipeForm onSubmit={handleAddRecipe} onCancel={() => setShowModal(false)} />
      </Modal>

      {feedback && (
        <div className={`toast ${feedback.type}`}>
          {feedback.msg}
        </div>
      )}
    </div>
  );
}