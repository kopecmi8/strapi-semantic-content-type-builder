import { createSelector } from 'reselect';

/**
 * Direct selector to the list state domain
 */

const selectGlobalDomain = () => state => state.get('global');

const makeSelectLoading = () => createSelector(
  selectGlobalDomain(),
  (globalSate) => globalSate.get('loading'),
);

const makeSelectModels = () => createSelector(
  selectGlobalDomain(),
  (globalSate) => globalSate.get('models').toJS(),
);

const makeSelectMenu = () => createSelector(
  selectGlobalDomain(),
  (globalSate) => globalSate.get('menu').toJS(),
);

export {
  makeSelectLoading,
  makeSelectMenu,
  makeSelectModels,
};
