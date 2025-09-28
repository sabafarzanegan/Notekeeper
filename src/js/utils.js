"use strict";

const addEventOnElements = (elements, eventType, callback) => {
  elements.forEach((element) => element.addEventListener(eventType, callback));
};

export { addEventOnElements };
