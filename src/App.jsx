import { useCallback, useEffect, useRef, useState } from 'react';
import { Movies } from './Components/Movies';
import { useMovies } from './Hooks/useMovies';
import debounce from 'just-debounce-it';
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Image,
    Item,
    Label,
    Menu,
    Segment,
    Step,
    Table,
} from 'semantic-ui-react';

const style = {
    h1: {
        marginTop: '3em',
    },
    h2: {
        margin: '4em 0em 2em',
    },
    h3: {
        marginTop: '2em',
        padding: '2em 0em',
    },
    last: {
        marginBottom: '300px',
    },
};
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
        }, 500),
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
            <Container className="page">
                <Header>
                    <h1>Buscador de películas</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div>
                            <label>Introduzca el criterio de búsqueda:</label>
                            <input
                                className={error ? 'inputError' : ''}
                                name="search"
                                placeholder="Batman, Toy Story, La vida es bella..."
                                value={search}
                                onChange={handleChange}
                            />
                        </div>
                        <Label>
                            Ordenado por título:
                            <input
                                className={error ? 'inputError' : ''}
                                type="checkbox"
                                onChange={handleSort}
                                checked={sort}
                            />
                        </Label>
                        <Button type="submit">Buscar</Button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {movies.length > 0 ? (
                        <div>
                            <Button onClick={handlePrevious}>Anterior</Button>
                            página {currentPage} de{' '}
                            {totalPages ? totalPages : currentPage}
                            <Button onClick={handleNext}>Siguiente</Button>
                        </div>
                    ) : (
                        <></>
                    )}
                </Header>
                <main>
                    {loading ? (
                        <h2>Cargando...</h2>
                    ) : (
                        <>
                            <Movies movies={movies} />
                        </>
                    )}
                </main>
            </Container>
        </>
    );
}

export default App;
