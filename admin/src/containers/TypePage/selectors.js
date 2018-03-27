import { createSelector } from 'reselect';

/**
 * Direct selector to the typepage state domain
 */
const selectTypePageDomain = () => state => state.get('typePage');

/**
 * Selectors used by TypePage
 */

const makeSelectTypes = () =>
  createSelector(selectTypePageDomain(), substate => substate.get('types').toArray().map((v) => {return {'label': v, 'value': v}}));

const makeSelectLoading = () =>
  createSelector(selectTypePageDomain(), substate => substate.get('loading'));

const makeSelectTypeProperties = () =>
  createSelector(selectTypePageDomain(), substate => substate.get('typeProperties'));

const makeSelectTypeName = () =>
  createSelector(selectTypePageDomain(), substate => substate.get('typeName'));

const makeSelectSelectedProperties = () =>
  createSelector(selectTypePageDomain(), substate => substate.get('selectedProperties'));

const makeSelectFilledProperties = () =>
  createSelector(selectTypePageDomain(), substate => substate.get('filledProperties'));



export {
  makeSelectLoading,
  makeSelectTypeProperties,
  makeSelectTypeName,
  makeSelectTypes,
  makeSelectSelectedProperties,
  makeSelectFilledProperties
};
