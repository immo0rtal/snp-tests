import { createSelector } from 'reselect';

export const authSelector = createSelector(
  state => state,
  state => state.auth
);

export const isFetchingSelector = createSelector(
  authSelector,
  ({ fetching }) => fetching
);

export const loginSelector = createSelector(authSelector, ({ login }) => login);

export const loadingSelector = createSelector(
  authSelector,
  ({ loading }) => loading
);

export const initialLoadingSelector = createSelector(
  authSelector,
  ({ initialLoading }) => initialLoading
);

export const dataSelector = createSelector(authSelector, ({ data }) => data);

export const usersSelector = createSelector(authSelector, ({ users }) => users);

export const errorSelector = createSelector(
  authSelector,
  ({ errorMessage }) => errorMessage
);

export const isAdminSelector = createSelector(
  authSelector,
  ({ isAdmin }) => isAdmin
);
