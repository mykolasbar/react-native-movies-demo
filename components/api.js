export const fetchMovie = (id) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b`)
            .then((response) => response.json())
}

export const fetchCategoryFull = (query, page) => {
    return fetch(`https://api.themoviedb.org/3/movie/${query}?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b&language=en-US&page=${page}`)
            .then((response) => response.json())
}

export const fetchCategory = (query) => {
    return fetch(`https://api.themoviedb.org/3/movie/${query}?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b&language=en-US`)
            .then((response) => response.json())
}

export const fetchVideos = (filmId) => {
    return fetch(`https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b`)
            .then(response => response.json())
}

export const searchMovies = (query, page) => {
    return fetch(`https://api.themoviedbbbb.org/3/search/movie?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b&language=en-US&query=${query}&page=${page}`)
            .then(response => response.json())
            // .catch((err) => {setError(err.message)})
}