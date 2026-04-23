export function FilterBar({ filters, onFilterChange, total }) {
  const categories = ['Daging','Seafood','Ayam','Sayuran','Nasi','Sup','Kue','Minuman'];
  const difficulties = ['Mudah','Sedang','Sulit'];

  return (
    <div className='filter-bar'>
      <input type='text' placeholder='Cari nama atau asal daerah...'
        value={filters.search}
        onChange={e => onFilterChange('search', e.target.value)} />

      <select value={filters.kategori} onChange={e => onFilterChange('kategori', e.target.value)}>
        <option value=''>Semua Kategori</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select value={filters.kesulitan} onChange={e => onFilterChange('kesulitan', e.target.value)}>
        <option value=''>Semua Tingkat</option>
        {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
      </select>

      <span>{total} resep ditemukan</span>
    </div>
  );
}
