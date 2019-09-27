import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

import TripPoint from './../components/trip-point';
import TripPointEdit from './../components/trip-point-edit';
import {render, parseImages, parseOffers} from './../utils';
import moment from 'moment';

export default class PointController {
  constructor(container, tripPointData, onDataChange, onChangeView) {
    this._container = container;
    this._tripPointData = tripPointData;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._tripPoint = new TripPoint(tripPointData);
    this._tripPointEdit = new TripPointEdit(tripPointData);

    this.init();
  }

  init() {
    flatpickr(this._tripPointEdit.getElement().querySelector(`input[name="event-start-time"]`), {
      altInput: false,
      dateFormat: `m/d/y, H:i`,
      [`time_24hr`]: true,
      allowInput: true,
      enableTime: true,
      defaultDate: this._tripPoint.timeStart
    });

    flatpickr(this._tripPointEdit.getElement().querySelector(`input[name="event-end-time"]`), {
      altInput: false,
      dateFormat: `m/d/y, H:i`,
      [`time_24hr`]: true,
      allowInput: true,
      enableTime: true,
      defaultDate: this._tripPoint.timeStart + this._tripPoint.duration,
      minDate: this._tripPoint.timeStart
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.getElement().replaceChild(this._tripPoint.getElement(), this._tripPointEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onTripPointEditSubmit = (evt) => {
      evt.preventDefault();
      const formData = new FormData(this._tripPointEdit.getElement().querySelector(`form.event--edit`));

      const entry = {
        id: this._tripPointData.id,
        price: formData.get(`event-price`),
        type: formData.get(`event-type`),
        city: formData.get(`event-destination`),
        isFavourite: !!formData.get(`event-favorite`),
        timeStart: formData.get(`event-start-time`),
        duration: moment(formData.get(`event-end-time`), `MM/DD/YY, HH:mm`).valueOf() - moment(formData.get(`event-start-time`), `MM/DD/YY, HH:mm`).valueOf(),
        imagesUrls: parseImages(this._tripPointEdit.getElement().querySelectorAll(`img.event__photo`)),
        offers: parseOffers(this._tripPointEdit.getElement().querySelectorAll(`.event__offer-label`)),
        description: this._tripPointEdit.getElement().querySelector(`.event__destination-description`).innerText,
      };

      this._onDataChange(entry, this._tripPointData);
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
