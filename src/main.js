import SiteMenu from './components/site-menu';
import Filters from './components/filters';
import RouteInfo from './components/route-info';
import {getTripPoint, filtersData} from './data/data';
import TripController from './controllers/trip-controller';
import Statistics from './components/statistics';
import {render} from './utils';
import API from './api';

// const TASK_COUNT = 3;
const siteMainElement = document.querySelector(`.page-main`);
const siteHeaderElement = document.querySelector(`.page-header`);
const tripInfo = siteHeaderElement.querySelector(`.trip-info`);
const tripControls = siteHeaderElement.querySelector(`.trip-controls`);
const tripEvents = siteMainElement.querySelector(`.trip-events`);

const siteMenu = new SiteMenu();
const filters = new Filters(filtersData);
const routeInfo = new RouteInfo();

const ACTIVITY_TYPES = [`Check-in`, `Restaurant`, `Sightseeing`];
const TRANSFER_TYPES = [`Bus`, `Drive`, `Flight`, `Ship`, `Taxi`, `Train`, `Transport`];
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip/`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
api.getTripPoints().then((tripPoints) => {
  console.log(tripPoints);
  const tripController = new TripController(tripEvents, tripPoints);
  tripController.init();
});

render(tripControls, siteMenu.getElement(), `afterbegin`);
render(tripControls, filters.getElement(), `beforeend`);
render(tripInfo, routeInfo.getElement(), `afterbegin`);

// const tripPointMocks = new Array(TASK_COUNT).fill(``).map(getTripPoint);


const stats = new Statistics();
render(tripEvents, stats.getElement(), `beforeend`);

siteMenu.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();
  if (evt.target.tagName !== `A`) {
    return;
  }

  switch (evt.target.textContent) {
    case `Table`:
      stats.getElement().classList.add(`visually-hidden`);
      tripController.show();
      break;
    case `Stats`:
      tripController.hide();
      stats.getElement().classList.remove(`visually-hidden`);
      break;
  }
});

export {TRANSFER_TYPES, ACTIVITY_TYPES};
