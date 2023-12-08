// async-storage.service.js

import { utilService } from "./util.service.js";


function query(entityType) {
  try {
    const entities = JSON.parse(utilService.loadFromStorage(entityType)) || [];
    return entities;
  } catch (e) {
    console.log(e);
  }
}

async function get(entityType, emailId) {
  try {
    const entities = await query(entityType);
    const entity = entities.find((entit) => entit.id === emailId);
    if (!entity) throw new Error("Cannot find");
    return entity;
  } catch (e) {
    console.log(e);
  }
}

async function post(entityType, newEntity) {
    try {
      const entities = await query(entityType);
      newEntity = { ...newEntity, id: utilService.makeId() };  
      entities.push(newEntity);
      utilService.saveToStorage(entityType, entities);
      return newEntity;
    } catch (e) {
      console.log(e);
    }
  }
  

async function put(entityType, updateEntity) {
  try {
    const entities = await query(entityType);
    const idx = entities.findIndex((entity) => entity.id === updateEntity.id);
    if (idx < 0) throw new Error("Cannot find");
    entities.splice(idx, 1, updateEntity);
    utilService.saveToStorage(entityType, entities);
    return updateEntity;
  } catch (e) {
    console.log(e);
  }
}

async function remove(entityType, emailId) {
  try {
    const entities = await query(entityType);
    const idx = entities.findIndex((entity) => entity.id === emailId);
    if (idx < 0) throw new Error("Cannot find");
    entities.splice(idx, 1);
    utilService.saveToStorage(entityType, entities);

  } catch (e) {
    console.log(e);
  }
}


export const storageService = {
  query,
  get,
  post,
  put,
  remove,
};