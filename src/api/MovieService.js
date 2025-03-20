import axios from 'axios'

export default class MovieService {
  constructor() {
    this._apiUrl = 'https://api.themoviedb.org/3'
    this._posterUrl = 'https://image.tmdb.org/t/p/w500'
    this._defaultPosterUrl = 'https://imgholder.ru/200x300/8493a8/adb9ca.jpg&text=IMAGE'
    this._apiToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWM3ZDAwMDY3MTA3OTZiNjhjNjczMWU2OGIxNWE2MiIsIm5iZiI6MTc0MDY3MTg5Ny4yNTgsInN1YiI6IjY3YzA4Yjk5ODM0MDU4ZjE2YWM4ZThkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x9GWGHF0F19DIfIzdP-eHQd1O7abARibRc4DDVzXjc0'
    this._headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this._apiToken}`,
    }
    this._api = axios.create({
      baseURL: this._apiUrl,
      headers: this._headers,
    })
  }

  async fetchData(url, params) {
    const response = await this._api.get(url, { params })
    return response.data
  }

  async searchMovies(query, includeGenres = false) {
    if (!query) return

    try {
      const data = await this.fetchData('/search/movie', {
        query,
      })

      if (includeGenres) {
        const genres = await this.getMovieGenres()
        return this.convertMoviesData({ results: data.results, genres })
      }

      return this.convertMoviesData(data)
    } catch (e) {
      throw new Error(`[${e.response.status}] Failed to fetch movies. Try again later.`)
    }
  }

  async getMovieGenres() {
    const data = await this.fetchData('/genre/movie/list')
    return data.genres
  }

  convertMoviesData({ results, genres }) {
    return results.map((movie) => {
      const posterUrl = movie.poster_path && this._posterUrl + movie.poster_path
      const movieGenres =
        genres &&
        movie.genre_ids.map((id) => {
          return genres.find((genre) => genre.id === id)
        })

      return {
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        description: movie.overview,
        genres: movieGenres,
        posterImageUrl: posterUrl || this._defaultPosterUrl,
      }
    })
  }
}
