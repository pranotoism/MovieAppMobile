import axios from 'axios';

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (title="") => {
  const response = await axios.get(`https://api.themoviedb.org/3/${title ? `search/` : "discover/"}movie?api_key=67447b21a008ed0cafe1d929a69b6c83${title ? `&query=${title}` : ""}`,
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzQ0N2IyMWEwMDhlZDBjYWZlMWQ5MjlhNjliNmM4MyIsInN1YiI6IjYzMWRkY2Q5YzRmNTUyMDA3ZjYxYTdkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dmm_7By8AjYhrXkzr2YqAkTWjlrRoa6i7p1FyEM_qqg",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  return (await response.data.results);
});

export const moviesAdapter = createEntityAdapter();

const moviesSlice = createSlice({
  name: 'movies',
  initialState: moviesAdapter.getInitialState({
    loading: false,
    movies: [],
    movie: {}
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      moviesAdapter.setAll(state, action.payload);
      state.loading = false;
      state.movie = state.movie
      state.movies = action.payload
    });
    builder.addCase(fetchMovies.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const {
  selectById: selectMovieById,
  selectIds: selectMovieIds,
  selectEntities: selectMovieEntities,
  selectAll: selectAllMovies,
  selectTotal: selectTotalMovies
} = moviesAdapter.getSelectors((state) => state.movies);

export default moviesSlice.reducer;