/* eslint-disable react/prop-types */
import { Header, Image, Table } from 'semantic-ui-react';

const noFoto = '/src/assets/nohayfoto.webp';

function ListOfMovies({ movies }) {
    return (
        <>
            <Table>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell width={2}>Portada</Table.HeaderCell>
                        <Table.HeaderCell width={8}>
                            Título, año
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {movies.map((movie) => (
                        <Table.Row key={movie.id}>
                            <Table.Cell>
                                <Header>
                                    <Image
                                        src={
                                            movie.img === 'N/A'
                                                ? noFoto
                                                : movie.img
                                        }
                                        fluid
                                    />
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                <Header>
                                    {movie.title} - {movie.year}
                                    <Header.Content>
                                        {movie.plot}
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
