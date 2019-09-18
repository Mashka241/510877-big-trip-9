import {createSiteMenuTemplate} from './components/site-menu';
import {createFiltersTemplate} from './components/filters';
import {createRouteInfoTemplate} from './components/route-info';
import {getTripPoint} from './data/data';
import TripController from './controllers/trip-controller';

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

const tripPointMocks = new Array(TASK_COUNT).fill(``).map(getTripPoint);

const tripController = new TripController(tripEvents, tripPointMocks);
tripController.init();
