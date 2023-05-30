/* eslint-disable react/prop-types */
function ListOfMovies({ movies }) {
    return (
        <>
            <ul className="movies">
                {movies.map((movie) => (
                    <li className="movie" key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        {movie.img === 'N/A' ? (
                            <img
                                src="/src/assets/nohayfoto.webp"
                                alt={movie.title}
                            />
                        ) : (
                            <img src={movie.img} alt={movie.title} />
                        )}
                    </li>
                ))}
            </ul>
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
