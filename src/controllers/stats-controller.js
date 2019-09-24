import Statistics from './../components/statistics';
// import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class StatController {
  constructor(container) {
    this._container = container;
    this._statistics = new Statistics();
  }

  hide() {
    if (this._statistics.getElement().classList.contains(`visually-hidden`)) {
      return;
    }
    this._statistics.getElement().classList.add(`visually-hidden`);
  }

  show() {
    if (this._statistics.getElement().classList.contains(`visually-hidden`)) {
      this._statistics.getElement().classList.remove(`visually-hidden`);
    }
  }
}
