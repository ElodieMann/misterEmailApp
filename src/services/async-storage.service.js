// async-storage.service.js

import { utilService } from "./util.service.js";

async function query(entityType) {
  try {
    const entities = await utilService.loadFromStorage(entityType);
    console.log(entities, 'ent query');
    return entities?.[0] || entities || [];
  } catch (e) {
    console.log(e);
  }
}

async function get(entityType, identifier) {
  try {
    const entities = await query(entityType);
    const entity = entities.find((entit) => entit.id === identifier);
    if (!entity) throw new Error("Cannot find");
    return entity;
  } catch (e) {
    console.log(e);
  }
}

async function findUserEmails(entityType, userEmail) {

  try {
    const allEmails = await query(entityType);
    const userEmails = allEmails.filter((email) => email.to === userEmail);
    return userEmails;
  } catch (error) {
    console.error(error);
    throw new Error("Error finding user emails");
  }
}

async function post(entityType, newEntity) {
  try {
    const entities = await query(entityType);
    console.log('entities', entities);
    console.log('newEntity', newEntity);
    entities.push(newEntity);
    utilService.saveToStorage(entityType, entities);
    return newEntity;
  } catch (e) {
    console.log(e);
  }
}

async function put(entityType, updateEntity) {
  try {
    let entities = await query(entityType);
  
    const idx = entities.findIndex((entity) => entity.id === updateEntity.id);

    if (idx < 0) throw new Error("Cannot find");
    entities[idx] = updateEntity;
    utilService.saveToStorage(entityType, [entities]);
    return updateEntity
  } catch (e) {
    console.log(e);
  }
}

async function remove(entityType, emailId) {
  try {
    const entities = await query(entityType);
    const idx = entities.findIndex((entity) => entity.id === emailId);
    
    if (idx < 0) throw new Error("Cannot find");

    entities[idx].removedAt = Date.now();

    utilService.saveToStorage(entityType, [entities]);
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
  findUserEmails,
};
