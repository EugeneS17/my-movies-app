import axios from 'axios'

export default class MovieService {
  constructor() {
    this._apiUrl = 'https://api.themoviedb.org/3'
    this._apiToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWM3ZDAwMDY3MTA3OTZiNjhjNjczMWU2OGIxNWE2MiIsIm5iZiI6MTc0MDY3MTg5Ny4yNTgsInN1YiI6IjY3YzA4Yjk5ODM0MDU4ZjE2YWM4ZThkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x9GWGHF0F19DIfIzdP-eHQd1O7abARibRc4DDVzXjc0'
    this._apiKey = 'c1c7d0006710796b68c6731e68b15a62'
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
    try {
      const response = await this._api.get(url, params)
      return response.data
    } catch (error) {
      // if (error.response) {
      // console.log(error.response.data)
      // console.log(error.response.status)
      // console.log(error.response.headers)
      // } else if (error.request) {
      // console.log(error.request)
      // } else {
      // console.log('Error', error.message)
      // }
      return error
    }
  }

  async searchMovies(query) {
    const data = await this.fetchData('/search/movie', {
      params: {
        query,
      },
    })
    return data
  }
}
