/* eslint-disable react/prop-types */
import { Grid, Card, Image, Icon } from 'semantic-ui-react';

const noFoto = '/src/assets/nohayfoto.webp';

function ListOfMovies({ movies }) {
    return (
        <>
            <Grid>
                {movies.map((movie) => (
                    <Grid.Column
                        mobile={8}
                        tablet={8}
                        computer={16}
                        largeScreen={4}
                        widescreen={4}
                        key={movie.id}
                    >
                        <Card>
                            <Image
                                src={movie.img === 'N/A' ? noFoto : movie.img}
                                wrapped
                                ui={true}
                            />
                            <Card.Content>
                                <Card.Header>{movie.title}</Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name="time" />
                                {movie.year}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                ))}
            </Grid>
        </>
    );
}

function NoMovies() {
    return <>🤫 No se han encontrado películas con este criterio</>;
}

export function MoviesCards({ movies }) {
    const hasMovies = movies?.length > 0;
    return hasMovies ? <ListOfMovies movies={movies} /> : <NoMovies />;
}
