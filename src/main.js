import {createSiteMenuTemplate} from './components/site-menu';
import {createFiltersTemplate} from './components/filters';
import {createRouteInfoTemplate} from './components/route-info';
import {createEventEditTemplate} from './components/event-edit';
import {createSortTemplate} from './components/sort';
import {createTripDayTemplate} from './components/trip-day';
import {createEventsListTemplate} from './components/events-list';

const EVENT_COUNT = 3;

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
render(tripEvents, createEventEditTemplate(), `beforeend`);
render(tripEvents, createEventsListTemplate(), `beforeend`);

const eventsList = document.querySelector(`.trip-days`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(eventsList, createTripDayTemplate(), `beforeend`);
}
