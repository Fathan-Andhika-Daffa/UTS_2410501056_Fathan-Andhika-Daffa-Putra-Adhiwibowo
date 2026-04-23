import { Accordion } from './Accordion';
import './RecipeCard.css';

export function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">

      <div className="card-img-wrap">
        <div className="card-img-emoji">
          {recipe.nama?.charAt(0).toUpperCase()}
        </div>
        <span className="card-category-badge">{recipe.kategori}</span>
        <span className={`card-diff-badge diff-${recipe.kesulitan?.toLowerCase()}`}>
          {recipe.kesulitan}
        </span>
      </div>

      <div className="card-body">
        <div className="card-title">{recipe.nama}</div>
        <div className="card-origin">📍 {recipe.asal_daerah}</div>
        <div className="card-desc">{recipe.deskripsi}</div>

        <div className="card-meta">
          <div className="card-meta-item">
            <span className="card-meta-icon">⏱️</span>
            {recipe.waktu} menit
          </div>
          <div className="card-meta-item">
            <span className="card-meta-icon">👥</span>
            {recipe.porsi} porsi
          </div>
          <div className="card-meta-item">
            <span className="card-meta-icon">📋</span>
            {recipe.langkah?.length} langkah
          </div>
        </div>

        <Accordion
          ingredients={recipe.bahan}
          steps={recipe.langkah}
        />
      </div>

    </div>
  );
}