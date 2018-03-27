/*
 *
 * TypePage actions
 *
 */

import {
  GET_TYPES,
  TYPES_LOADED,
  TYPE_SELECTED,
  PROPERTIES_LOADED,
  PROPERTIES_SELECTED,
  PROPERTY_FILLED,
  PROPERTY_REMOVE
} from './constants';


export function getTypes(){

  return {
    type: GET_TYPES,
  };
}

export function loadedTypes(types){

  return {
    type: TYPES_LOADED,
    types: types,
  };

}

export function selectType(typeValue) {

  const typeName = typeValue ? typeValue.value : null;

  return {
    type: TYPE_SELECTED,
    typeName: typeName,
  };
}


export function loadedProperties(properties) {

  return {
    type: PROPERTIES_LOADED,
    typeProperties: properties,
  };
}

export function selectProperties(properties) {

  const selectedProperties = properties.map((item) => {
    return item.value;
  });

  return {
    type: PROPERTIES_SELECTED,
    selectedProperties: selectedProperties,
  };
}

export function fillProperty(propertyValue) {

  return {
    type: PROPERTY_FILLED,
    propertyValue: propertyValue,
    property: propertyValue.id,
  };
}

export function removeProperty(property){
  return {
    type: PROPERTY_REMOVE,
    property: property
  };
}
