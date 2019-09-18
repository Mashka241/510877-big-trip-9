
import TripDaysBoard from './../components/trip-days-board';
import Sort from './../components/sort';
import EventsList from './../components/events-list'
import TripPoint from './../components/trip-point';
import TripPointEdit from './../components/trip-point-edit';
import {render} from './../utils';

export default class TripController {
  constructor(container, tripPoints) {
    this._container = container;
    this._tripPoints = tripPoints;
    this._sort = new Sort();
    this._tripDaysBoard = new TripDaysBoard();
    this._eventsList = new EventsList();
  }

  init() {
    render(this._container, this._sort.getElement(), `beforeend`);
    render(this._container, this._tripDaysBoard.getElement(), `beforeend`);
    render(this._tripDaysBoard.getElement(), this._eventsList.getElement(), `beforeend`);

    this._tripPoints.forEach((tripPointMock) => this._renderTripPoint(tripPointMock));
  }

  _renderTripPoint(tripPointMock) {
    const tripPoint = new TripPoint(tripPointMock);
    const tripPointEdit = new TripPointEdit(tripPointMock);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._eventsList.getElement().replaceChild(tripPoint.getElement(), tripPointEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onTripPointEditSubmit = (evt) => {
      evt.preventDefault();
      this._eventsList.getElement().replaceChild(tripPoint.getElement(), tripPointEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    tripPoint.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._eventsList.getElement().replaceChild(tripPointEdit.getElement(), tripPoint.getElement());
      tripPointEdit.getElement().addEventListener(`submit`, onTripPointEditSubmit);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    render(this._eventsList.getElement(), tripPoint.getElement(), `beforeend`);
  }
}
