/* eslint-disable no-param-reassign */

import { createSlice, createAction } from 'redux-starter-kit';

const actionGetTestsSuccess = createAction('tests/getTestsSuccess');

const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    answers: [],
    loading: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    [actionGetTestsSuccess]: (state, { payload }) => {
      state.answers = payload.answers;
    },
  },
});

// export const {} = answersSlice.actions;

export default answersSlice.reducer;
