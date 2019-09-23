import TripDaysBoard from './../components/trip-days-board';
import Sort from './../components/sort';
import EventsList from './../components/events-list';
import PointController from './point-controller';
import {render, unrender} from './../utils';

export default class TripController {
  constructor(container, tripPoints) {
    this._container = container;
    this._tripPoints = tripPoints;
    this._sort = new Sort();
    this._tripDaysBoard = new TripDaysBoard();
    this._eventsList = new EventsList();
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._sort.getElement(), `beforeend`);
    render(this._container, this._tripDaysBoard.getElement(), `beforeend`);
    render(this._tripDaysBoard.getElement(), this._eventsList.getElement(), `beforeend`);

    this._tripPoints.forEach((tripPointMock) => this._renderTripPoint(tripPointMock));
  }

  hide() {
    this._tripDaysBoard.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._tripDaysBoard.getElement().classList.remove(`visually-hidden`);
  }

  _renderEventsList() {
    unrender(this._eventsList.getElement());
    this._eventsList.removeElement();
    render(this._tripDaysBoard.getElement(), this._eventsList.getElement(), `beforeend`);
    this._tripPoints.forEach((tripPointMock) => this._renderTripPoint(tripPointMock));
  }

  _renderTripPoint(tripPointMock) {
    const tripPoint = new PointController(this._eventsList, tripPointMock, this._onDataChange, this._onChangeView);
    this._subscriptions.push(tripPoint.setDefaultView.bind(tripPoint));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    const index = this._tripPoints.findIndex((it) => it === oldData);
    if (newData === null) {
      this._tripPoints = [...this._tripPoints.slice(0, index), ...this._tripPoints.slice(index + 1)];
    } else {
      this._tripPoints[index] = newData;
    }

    this._renderEventsList();
  }
}
