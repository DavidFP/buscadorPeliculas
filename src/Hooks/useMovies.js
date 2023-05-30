import { useCallback, useState, useRef, useMemo } from 'react';
import { searchMovies } from '../Services/Movies';

export function useMovies({ search, sort, currentPage }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const previousSearch = useRef(search);
    const previousPage = useRef(currentPage);

    const getMovies = useCallback(async ({ search, currentPage }) => {
        if (
            search === previousSearch.current &&
            currentPage === previousPage.current
        )
            return;
        try {
            setLoading(true);
            setError(null);
            previousSearch.current = search;
            const resposeMovies = await searchMovies({ search, currentPage });
            setMovies(resposeMovies.movies);
            const pages = parseInt(resposeMovies.count / 10);
            setTotalPages(pages);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const sortedMovies = useMemo(() => {
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies;
    }, [sort, movies]);

    return {
        movies: sortedMovies,
        loading,
        error,
        totalPages,
        getMovies,
    };
}
