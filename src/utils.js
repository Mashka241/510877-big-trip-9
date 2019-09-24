import moment from 'moment';

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
};

const getFormattedDuration = (duration) => {
  let formattedDuration = ``;
  if (moment.duration(duration).days()) {
    formattedDuration = `${moment.duration(duration).days()}D `;
  }
  if (moment.duration(duration).hours()) {
    formattedDuration = `${formattedDuration}${moment.duration(duration).hours()}H `;
  }
  if (moment.duration(duration).minutes()) {
    formattedDuration = `${formattedDuration}${moment.duration(duration).minutes()}M`;
  }
  return formattedDuration;
};

const splitEventsByDay = (events) => {
  const temp = {};
  const getDateFromStamp = (timeStamp) => new Date(timeStamp).getDate().toString();
  events.forEach((it) => {
    if (!temp[getDateFromStamp(it.timeStart)]) {
      temp[getDateFromStamp(it.timeStart)] = [];
    }
    temp[getDateFromStamp(it.timeStart)].push(it);
  });
  return Object.keys(temp).map((key) => temp[key]);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTEREND:
      container.after(element);
      break;
    case Position.BEFOREBEGIN:
      container.before(element);
      break;
  }
};

const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export {Position, getFormattedDuration, splitEventsByDay, createElement, render, unrender};
