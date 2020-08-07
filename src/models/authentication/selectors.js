import { createSelector } from 'reselect';

// import { denormalize } from 'utils/normalizeById';

export const authSelector = createSelector(
  state => state,
  state => state.auth
);

export const isFetchingSelector = createSelector(
  authSelector,
  ({ fetching }) => fetching
);

export const loginSelector = createSelector(
  state => state.auth.login,
  login => login
);

export const loadingSelector = createSelector(
  state => state.auth.loading,
  loading => loading
);

export const initialLoadingSelector = createSelector(
  state => state.auth.initialLoading,
  initialLoading => initialLoading
);

export const dataSelector = createSelector(
  state => state.auth.data,
  data => data
);

export const usersSelector = createSelector(
  state => state.auth.users,
  users => users
);

export const errorSelector = createSelector(
  state => state.auth.errorMessage,
  err => err
);

export const isAdminSelector = createSelector(
  state => state.auth.isAdmin,
  isAdmin => isAdmin
);
