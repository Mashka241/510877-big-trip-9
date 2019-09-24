import AbstractComponent from './../components/abstract-component';

const DEFAULT_FILTER = `Everything`;
export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return `
      <form class="trip-filters" action="#" method="get">
      ${this._filters.map((filter) => `
        <div class="trip-filters__filter">
          <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}" ${(filter === DEFAULT_FILTER) ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
        </div>
      `).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`.trim();
  }
}
