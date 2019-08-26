import {getTripPoint} from './../data/data';
import {createTripPointTemplate} from './trip-point';

export const createTripDayTemplate = ({day, date}) => {
  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${day}</span>
      <time class="day__date" datetime="2019-03-18">${new Date(date).toDateString()}</time>
    </div>
    <ul class="trip-events__list">
    ${new Array(4).fill(``).map(getTripPoint).map(createTripPointTemplate).join(``)}
    </ul>
  </li>`;
};
