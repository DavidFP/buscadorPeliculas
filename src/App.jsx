import { useCallback, useEffect, useRef, useState } from 'react';
import { useMovies } from './Hooks/useMovies';
import debounce from 'just-debounce-it';
import {
    Button,
    Container,
    Header,
    Form,
    Label,
    Segment,
    Icon,
} from 'semantic-ui-react';
import { MoviesCards } from './Components/MoviesCard';

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
            <Container textAlign="center">
                <Header as="h1" icon textAlign="center">
                    <Icon name="film" circular></Icon>
                    <Header.Content>Buscador de películas</Header.Content>
                </Header>
                <Form className="form" onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Introduzca el criterio de búsqueda:</label>
                        <input
                            className={error ? 'inputError' : ''}
                            name="search"
                            placeholder="Batman, Toy Story, La vida es bella..."
                            value={search}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Label>
                            Ordenado por título:
                            <input
                                className={error ? 'inputError' : ''}
                                type="checkbox"
                                onChange={handleSort}
                                checked={sort}
                            />
                        </Label>
                    </Form.Field>
                    <Button fluid color="teal" type="submit">
                        Buscar
                    </Button>
                </Form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {movies.length > 0 ? (
                    <div>
                        <Segment>
                            <Button onClick={handlePrevious}>Anterior</Button>
                            página {currentPage} de{' '}
                            {totalPages ? totalPages : currentPage}
                            <Button onClick={handleNext}>Siguiente</Button>
                        </Segment>
                    </div>
                ) : (
                    <></>
                )}
            </Container>
            <Container>
                {loading ? (
                    <h2>Cargando...</h2>
                ) : (
                    <>
                        <MoviesCards movies={movies} />
                    </>
                )}
            </Container>
        </>
    );
}

export default App;
