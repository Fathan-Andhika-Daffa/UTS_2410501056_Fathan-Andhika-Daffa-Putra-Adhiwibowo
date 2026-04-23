import { useState, useEffect, useCallback } from 'react';
import { resepAPI } from '../services/api';

export function useRecipes() {
  const [recipes, setRecipes]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [pagination, setPag]    = useState({ page:1, total:0, totalPages:1 });
  const [filters, setFilters]   = useState({ kategori:'', kesulitan:'', search:'' });
  const [error, setError]       = useState(null);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await resepAPI.getAll({ ...filters, page: pagination.page, limit: 6 });
      setRecipes(data.data);
      setPag(prev => ({ ...prev, ...data.pagination }));
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [filters, pagination.page]);

  useEffect(() => { fetchRecipes(); }, [fetchRecipes]);

  const updateFilter = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
    setPag(prev => ({ ...prev, page: 1 }));
  };

  const changePage = (page) => setPag(prev => ({ ...prev, page }));

  return { recipes, loading, error, pagination, filters, updateFilter, changePage, refetch: fetchRecipes };
}
