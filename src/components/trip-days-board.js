import AbstractComponent from './abstract-component';
import moment from 'moment';

export default class TripDaysBoard extends AbstractComponent {
  constructor() {
    super();
    this._days = null;
  }

  setDays(points) {
    this._days = [...new Set(points.map((point) => new Date(point.dateFrom).setHours(0, 0, 0, 0)))];
  }

  getTemplate() {
    return `
      <ul class="trip-days">
      ${this._days ? this._days.map((day, index) => `
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${index + 1}</span>
          <time class="day__date" datetime="2019-03-18">${moment(day).format(`MMM D`)}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`).join(``) : `
      <li class="trip-days__item  day">
        <div class="day__info"></div>
        <ul class="trip-events__list"></ul>
      </li>`}
     </ul>`.trim();
  }
}
