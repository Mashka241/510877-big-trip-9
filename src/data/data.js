const MOCK_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getTripPoint = () => ({
  type: {
    bus: {
      title: `Bus to`,
      img: `bus.png`
    },
    checkin: {
      title: ``,
      img: `check-in.png`
    },
    drive: {
      title: `Drive to`,
      img: `drive.png`
    },
    flight: {
      title: `Flight to`,
      img: `flight.png`
    }
  },
  city: [
    `Geneva`,
    `Amsterdam`,
    `Chamonix`,
    `London`,
    `Berlin`,
    `Munich`,
    `Prague`,
    `Cologne`,
    `Fussen`
  ][Math.floor(Math.random() * 9)],
  get photo() {
    return new Array(Math.floor(Math.random() * 10)).fill(`http://picsum.photos/300/150?r=${Math.random()}`);
  },
  get description() {
    const descArray = MOCK_DESCRIPTION.split(`.`);
    return new Array(randomInteger(1, 3)).fill(descArray[randomInteger(0, descArray.length)]).join(`.`);
  },
  schedule: {
    start: Date.now(),
    duration: {
      days: 0,
      hours: randomInteger(0, 24),
      minutes: randomInteger(0, 60)
    },
    get end() {
      return this.start + (this.duration.hours * 60 * 60 * 1000 + this.duration.minutes * 60 * 1000);
    }
  },
  get price() {
    return randomInteger(1, 200);
  },
  options: [
    {
      title: `Add luggage`,
      price: 10,
      active: Boolean(Math.round(Math.random())),
    },
    {
      title: `Switch to comfort class`,
      price: 150,
      active: Boolean(Math.round(Math.random())),
    },
    {
      title: `Add meal`,
      price: 2,
      active: Boolean(Math.round(Math.random())),
    },
    {
      title: `Choose seats`,
      price: 9,
      active: Boolean(Math.round(Math.random())),
    },
  ]
});

// const tripDays = new Array(randomInteger(1, 4)).fill({}).
// map((it, index) => {
//   it.day = index + 1;
//   it.date = Date.now();
//   return {...it};
// });

const tripDays = new Array(randomInteger(1, 4)).fill().
map((it, index) => ({
  day: index + 1,
  date: Date.now()
}));

const filters = [
  {
    id: `everything`,
    checked: true,
  },
  {
    id: `future`,
    checked: false,
  },
  {
    id: `past`,
    checked: false,
  }
];

export {tripDays, getTripPoint, filters};
