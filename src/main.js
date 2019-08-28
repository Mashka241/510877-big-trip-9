import {createSiteMenuTemplate} from './components/site-menu';
import {createFiltersTemplate} from './components/filters';
import {createRouteInfoTemplate} from './components/route-info';
import {createSortTemplate} from './components/sort';
import {createTripDayTemplate} from './components/trip-day';
import {createEventsListTemplate} from './components/events-list';

import {getTripPoint} from './data/data';
import TripPoint from './components/trip-point';
import TripPointEdit from './components/trip-point-edit';

import {render as renderElement} from './utils';

const TASK_COUNT = 3;
const siteMainElement = document.querySelector(`.page-main`);
const siteHeaderElement = document.querySelector(`.page-header`);
const tripInfo = siteHeaderElement.querySelector(`.trip-info`);
const tripControls = siteHeaderElement.querySelector(`.trip-controls`);
const tripEvents = siteMainElement.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripControls, createSiteMenuTemplate(), `afterbegin`);
render(tripControls, createFiltersTemplate(), `beforeend`);
render(tripInfo, createRouteInfoTemplate(), `afterbegin`);
render(tripEvents, createSortTemplate(), `afterbegin`);
render(tripEvents, createEventsListTemplate(), `beforeend`);

const eventsList = document.querySelector(`.trip-days`);

render(eventsList, createTripDayTemplate(), `beforeend`);

const tripPointList = document.querySelector(`.trip-events__list`);


const renderTripPoint = (tripPointMock) => {
  const tripPoint = new TripPoint(tripPointMock);
  const tripPointEdit = new TripPointEdit(tripPointMock);

  tripPoint.getElement().
  querySelector(`.event__rollup-btn`).
  addEventListener(`click`, () => {
    tripPointList.replaceChild(tripPointEdit.getElement(), tripPoint.getElement());
  });

  tripPointEdit.getElement().
  addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    tripPointList.replaceChild(tripPoint.getElement(), tripPointEdit.getElement());
  });

  renderElement(tripPointList, tripPoint.getElement(), `beforeend`);
};

const tripPointMocks = new Array(TASK_COUNT).fill(``).map(getTripPoint);

tripPointMocks.forEach((tripPointMock) => renderTripPoint(tripPointMock));
