import axios from 'axios';

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (title="") => {
  const response = await axios.get(`https://api.themoviedb.org/3/${title ? `search/` : "discover/"}movie?api_key=${API}${title ? `&query=${title}` : ""}`,
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + TOKEN,
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