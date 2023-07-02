/* eslint-disable react/prop-types */
import { Grid, Card, Image, Icon, Message } from 'semantic-ui-react';

const noFoto = '/src/assets/nohayfoto.webp';

function MoviesGrid({ movies }) {
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
    return (
        <>
            <Message>
                <Message.Header>
                    🤫 No se han encontrado películas con este criterio
                </Message.Header>
                <p>Puedes probar a cambiar el texto de búsqueda...</p>
            </Message>
        </>
    );
}

export function MoviesCards({ movies }) {
    const hasMovies = movies?.length > 0;
    return hasMovies ? <MoviesGrid movies={movies} /> : <NoMovies />;
}
