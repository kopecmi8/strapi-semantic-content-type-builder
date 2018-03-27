/*
 *
 * ExamplePage reducer
 *
 */

import { fromJS, List, Map, OrderedSet } from 'immutable';

import {
  GET_TYPES,
  TYPES_LOADED,
  TYPE_SELECTED,
  PROPERTIES_LOADED,
  PROPERTIES_SELECTED,
  PROPERTY_FILLED,
  PROPERTY_REMOVE,
} from './constants';

const initialState = fromJS({
  loading: false,
  typeProperties: false,
  typeName: null,
  selectedProperties: List(),
  filledProperties: Map(),
  types:  List(),
});

function typePageReducer(state = initialState, action) {

  switch (action.type) {
    case GET_TYPES:
      return state.set('loading', true);
    case TYPES_LOADED:
      return state.set('loding', false)
                  .set('types', fromJS(action.types));
    case TYPE_SELECTED:
      return state.set('typeName', action.typeName)
                  .set('typeProperties', List())
                  .set('selectedProperties', List())
                  .set('loading', true);
    case PROPERTIES_LOADED:
      return state.set('loading', false)
                  .set('typeProperties', fromJS(action.typeProperties));
    case PROPERTIES_SELECTED:
      return state.set('selectedProperties', OrderedSet(action.selectedProperties));
    case PROPERTY_FILLED:

      const filledProperties = state.get('filledProperties');
      let updatedProperties;

      if(filledProperties.get(action.property)){
        updatedProperties = filledProperties.update(action.property, (item) => {return fromJS(action.propertyValue)});
      }else{
        updatedProperties = filledProperties.set(action.property, fromJS(action.propertyValue));
      }
      return state.set('filledProperties', updatedProperties);
    case PROPERTY_REMOVE:
      const selectedProperties = state.get('selectedProperties');
      const updatedSelectedProperties = selectedProperties.delete(action.property);

      return state.set('selectedProperties', updatedSelectedProperties);
    default:
      return state;
  }
}

export default typePageReducer;
