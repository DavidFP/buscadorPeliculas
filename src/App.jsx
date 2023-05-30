/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Movies } from './Components/Movies';
import { useMovies } from './Hooks/useMovies';
import debounce from 'just-debounce-it';

function useSearch() {
    const [search, updateSearch] = useState('');
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === '';
            return;
        }

        if (search === '') {
            setError('No se puede buscar una película vacía');
            return;
        }

        if (search.length < 3) {
            setError('La búsqueda debe tener al menos 3 caracteres');
            return;
        }

        setError(null);
    }, [search]);
    return { search, updateSearch, error };
}

function App() {
    const [sort, setSort] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { search, updateSearch, error } = useSearch();
    const { movies, loading, totalPages, getMovies } = useMovies({
        search,
        sort,
        currentPage,
    });

    const handleNext = () => {
        const nextVal =
            currentPage + 1 <= totalPages ? currentPage + 1 : totalPages;
        setCurrentPage(nextVal);
        getMovies({ search, currentPage: nextVal });
    };
    const handlePrevious = () => {
        const previousVal = currentPage - 1 >= 1 ? currentPage - 1 : 1;
        setCurrentPage(previousVal);
        getMovies({ search, currentPage: previousVal });
    };

    const debouncedGetMovies = useCallback(
        debounce((search) => {
            getMovies({ search, currentPage });
        }, 300),
        [getMovies]
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        getMovies({ search, currentPage });
    };
    const handleChange = (event) => {
        const currSearch = event.target.value;
        updateSearch(currSearch);
        debouncedGetMovies(currSearch);
    };

    const handleSort = () => {
        setSort(!sort);
    };

    return (
        <>
            <div className="page">
                <header>
                    <h1>Buscador de películas</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <label>Introduzca el criterio de búsqueda:</label>
                        <input
                            className={error ? 'inputError' : ''}
                            name="search"
                            placeholder="Batman..., Toy Story..., La vida es bella..."
                            value={search}
                            onChange={handleChange}
                        />
                        <label>
                            Ordenado por título:
                            <input
                                className={error ? 'inputError' : ''}
                                type="checkbox"
                                onChange={handleSort}
                                checked={sort}
                            />
                        </label>
                        <button type="submit">Buscar</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div>
                        <button onClick={handlePrevious}>Anterior</button>
                        página {currentPage} de{' '}
                        {totalPages ? totalPages : currentPage}
                        <button onClick={handleNext}>Siguiente</button>
                    </div>
                </header>
                <main>
                    {loading ? (
                        <h2>Cargando...</h2>
                    ) : (
                        <>
                            <Movies movies={movies} />
                        </>
                    )}
                </main>
            </div>
        </>
    );
}

export default App;
