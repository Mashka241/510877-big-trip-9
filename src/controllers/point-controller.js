import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

import TripPoint from './../components/trip-point';
import TripPointEdit from './../components/trip-point-edit';
import {render} from './../utils';

export default class PointController {
  constructor(container, tripPoint, onDataChange, onChangeView) {
    this._container = container;
    this._tripPoint = tripPoint;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._tripPoint = new TripPoint(tripPoint);
    this._tripPointEdit = new TripPointEdit(tripPoint);

    this.init();
  }

  init() {
    flatpickr(this._tripPointEdit.getElement().querySelector(`.event__input--time`), {
      altInput: false,
      dateFormat: `m/d/y, H:i`,
      [`time_24hr`]: true,
      allowInput: true,
      enableTime: true,
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.getElement().replaceChild(this._tripPoint.getElement(), this._tripPointEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onTripPointEditSubmit = (evt) => {
      evt.preventDefault();
      // this._container.getElement().replaceChild(this._tripPoint.getElement(), this._tripPointEdit.getElement());
      const formData = new FormData(this._tripPointEdit.getElement());

      const entry = {
        price: formData.get(`event-price`),
        type: formData.get(`event-type`),
        // destination: {
        //   name: formData.get(`event-destination`),
        // },
        // isFavourite: formData.get(`event-favorite`),
        dateFrom: formData.get(`event-start-time`),
        dateTo: formData.get(`event-end-time`),
      };

      this._onDataChange(entry, this._tripPoint);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    this._tripPoint.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._onChangeView();
      this._container.getElement().replaceChild(this._tripPointEdit.getElement(), this._tripPoint.getElement());
      this._tripPointEdit.getElement().addEventListener(`submit`, onTripPointEditSubmit);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._tripPointEdit.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
      this._onDataChange(null, this._tripPoint);
    });

    render(this._container.getElement(), this._tripPoint.getElement(), `beforeend`);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._tripPointEdit.getElement())) {
      this._container.getElement().replaceChild(this._tripPoint.getElement(), this._tripPointEdit.getElement());
    }
  }
}
