import {
  filters
} from './../data/data';

const createFilterTemplate = ({id, checked}) => {
  return `<div class="trip-filters__filter">
            <input id="filter-${id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${id}" ${checked ? `checked` : ``}>
            <label class="trip-filters__filter-label" for="filter-${id}">${id}</label>
          </div>`;
};

export const createFiltersTemplate = () => {
  return `<form class="trip-filters" action="#" method="get">
    ${filters.map(createFilterTemplate).join(``)}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};
