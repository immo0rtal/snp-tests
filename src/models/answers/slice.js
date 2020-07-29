/* eslint-disable no-param-reassign */

import { createSlice } from 'redux-starter-kit';
import { tests } from 'models/tests/slice';

const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    answers: [],
    loading: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    [tests.actions.getTestsSuccess]: (state, { payload }) => {
      state.answers = payload.answers;
    },
  },
});

// export const {} = answersSlice.actions;

export default answersSlice.reducer;
