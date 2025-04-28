import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSearch = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return {
    query,
    setQuery,
    handleSearch
  };
};

export default useSearch;
