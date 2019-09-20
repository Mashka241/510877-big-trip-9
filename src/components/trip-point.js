import AbstractComponent from './../components/abstract-component';
import moment from 'moment';
export default class TripPoint extends AbstractComponent {
  constructor({type, city, dateFrom, dateTo, price}) {
    super();
    this._type = type;
    this._city = city;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
    this._price = price;
  }

  getTemplate() {
    return `
      <li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${this._city}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${moment(this._dateFrom).toISOString()}">${moment(this._dateFrom).format(`HH:mm`)}</time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T11:00">${this._dateTo}</time>
            </p>
            <p class="event__duration">${1}H ${2}M</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${this._price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            <li class="event__offer">
              <span class="event__offer-title">Order Uber</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">20</span>
            </li>
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`.trim();
  }
}
