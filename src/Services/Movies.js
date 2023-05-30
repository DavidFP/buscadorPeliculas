import { API_URL } from '../Utils/Urls';

export const searchMovies = async ({ search, currentPage }) => {
    if (search === '') return null;
    try {
        const response = await fetch(
            `${API_URL}${encodeURI(search)}&page=${currentPage}`
        );
        const json = await response.json();
        const movies = json.Search;
        const count = parseInt(json.totalResults);

        const mappedMovies = movies?.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            img: movie.Poster,
            type: movie.Type,
        }));
        return { movies: mappedMovies, count: count };
    } catch (error) {
        throw new Error(`Movies Service -> searchMovies: ${error}`);
    }
};
