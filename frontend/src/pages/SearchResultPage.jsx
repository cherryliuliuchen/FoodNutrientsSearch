import React from 'react';
import useSearchResults from '../hooks/useSearchResults';
import SearchResultTable from '../components/SearchResultPage/SearchResultTable';

const SearchResultPage = () => {
  const { foods, loading } = useSearchResults();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Search Results</h2>
      <SearchResultTable foods={foods} />
    </div>
  );
};

export default SearchResultPage;
