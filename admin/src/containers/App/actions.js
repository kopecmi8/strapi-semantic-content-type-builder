/*
 *
 * App actions
 *
 */

import { List, Map } from 'immutable';
import {concat, findIndex, get, isEmpty, map, size} from 'lodash';
import {
  DELETE_CONTENT_TYPE,
  MODELS_FETCH,
  MODELS_FETCH_SUCCEEDED
} from './constants';

import { storeData } from '../../utils/storeData';

export function deleteContentType(itemToDelete, context) {
  const oldMenu = storeData.getMenu();
  const leftMenuContentTypes = get(context.plugins.toJS(), ['content-manager', 'leftMenuSections']);
  const leftMenuContentTypesIndex = !isEmpty(leftMenuContentTypes) ? findIndex(leftMenuContentTypes[0].links, ['destination', itemToDelete]) : -1;

  let updateLeftMenu = false;
  let sendRequest = true;

  if (oldMenu) {
    const index = findIndex(oldMenu, ['name', itemToDelete]);
    if (oldMenu[index].isTemporary) {
      sendRequest = false;
      storeData.clearAppStorage();
    }else {
      oldMenu.splice(index, 1);
      const newMenu = oldMenu;
      storeData.setMenu(newMenu);
    }
  }

  // Update Admin left menu content types
  if (leftMenuContentTypesIndex !== -1) {
    updateLeftMenu = true;
    leftMenuContentTypes[0].links.splice(leftMenuContentTypesIndex, 1);
  }

  return {
    type: DELETE_CONTENT_TYPE,
    itemToDelete,
    sendRequest,
    leftMenuContentTypes,
    updateLeftMenu,
    updatePlugin: context.updatePlugin,
  };
}

export function modelsFetch() {
  return {
    type: MODELS_FETCH,
  };
}

export function modelsFetchSucceeded(models) {
  const modelNumber = size(models.models) > 1 ? 'plural' : 'singular';

  const sections = storeData.getMenu() || map(models.models, (model) => ({icon: 'fa-caret-square-o-right', name: model.name, source: model.source }));

  if (!storeData.getMenu()){
    sections.push({ icon: 'fa-plus', name: 'button.contentType.add' });
  }

  const menu = {
    sections: [
      Map({
        name: `menu.section.contentTypeBuilder.name.${modelNumber}`,
        items: List(sections),
      }),
    ],
  };

  const data = storeData.getModel() ? { models: concat(models.models, storeData.getModel()) } : models;
  return {
    type: MODELS_FETCH_SUCCEEDED,
    data,
    menu,
  };
}