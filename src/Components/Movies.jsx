/* eslint-disable react/prop-types */
import { Header, Image, Table } from 'semantic-ui-react';

const noFoto = '/src/assets/nohayfoto.webp';

function ListOfMovies({ movies }) {
    return (
        <>
            <Table basic="very" className="movies">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Portada</Table.HeaderCell>
                        <Table.HeaderCell>Título, año</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {movies.map((movie) => (
                        <Table.Row key={movie.id}>
                            <Table.Cell>
                                <Header as="h2" image>
                                    <Image
                                        src={
                                            movie.img === 'N/A'
                                                ? noFoto
                                                : movie.img
                                        }
                                        rounded
                                    />
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                <Header>
                                    <h3>{movie.title}</h3>
                                    <Header.Content>
                                        {movie.year}
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
}

function NoMovies() {
    return <>🤫 No se han encontrado películas con este criterio</>;
}

export function Movies({ movies }) {
    const hasMovies = movies?.length > 0;
    return hasMovies ? <ListOfMovies movies={movies} /> : <NoMovies />;
}
