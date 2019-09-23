import SiteMenu from './components/site-menu';
import {createFiltersTemplate} from './components/filters';
import {createRouteInfoTemplate} from './components/route-info';
import {getTripPoint} from './data/data';
import TripController from './controllers/trip-controller';
import Statistics from './components/statistics';
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

const siteMenu = new SiteMenu();

renderElement(tripControls, siteMenu.getElement(), `afterbegin`);
render(tripControls, createFiltersTemplate(), `beforeend`);
render(tripInfo, createRouteInfoTemplate(), `afterbegin`);

const tripPointMocks = new Array(TASK_COUNT).fill(``).map(getTripPoint);

const tripController = new TripController(tripEvents, tripPointMocks);
tripController.init();
const stats = new Statistics();
renderElement(tripEvents, stats.getElement(), `beforeend`);

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
