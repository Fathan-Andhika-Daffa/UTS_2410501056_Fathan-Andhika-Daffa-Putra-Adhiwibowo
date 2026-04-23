export function Pagination({ pagination, onPageChange }) {
  const { page, totalPages } = pagination;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='pagination'>
      <button onClick={() => onPageChange(page-1)} disabled={page<=1}>←</button>
      {pages.map(p => (
        <button key={p} className={p===page ? 'active' : ''} onClick={() => onPageChange(p)}>{p}</button>
      ))}
      <button onClick={() => onPageChange(page+1)} disabled={page>=totalPages}>→</button>
      <span>Halaman {page} / {totalPages}</span>
    </div>
  );
}
