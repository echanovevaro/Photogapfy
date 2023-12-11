import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function useSearchContext() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [term, setTerm] = useState();

  function onSearch(term) {
    setTerm(term);
  }

  const value = {
    term,
    onSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
