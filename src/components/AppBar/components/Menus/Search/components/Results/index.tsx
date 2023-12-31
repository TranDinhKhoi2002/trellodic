import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDebounce } from '@/hooks';
import { searchGlobal } from '@/services/search';
import ResultsView from './view';

type ResultsProps = {
  search: string;
  onCloseResult: () => void;
};

function Results({ search, onCloseResult }: ResultsProps) {
  const {
    mutate,
    data: results,
    isPending,
  } = useMutation({
    mutationFn: searchGlobal,
  });

  const debouncedSearch = useDebounce(search);
  useEffect(() => {
    mutate({ search: debouncedSearch.trim() });
  }, [debouncedSearch, mutate]);

  return <ResultsView results={results} isSearching={isPending} onCloseResult={onCloseResult} />;
}

export default Results;
