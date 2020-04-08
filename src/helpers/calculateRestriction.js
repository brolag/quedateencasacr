const covidRestriction = [
  { day: 8, plates: [0, 1] },
  { day: 9, plates: [2, 3] },
  { day: 10, plates: [4, 6] },
  { day: 11, plates: [6, 7] },
  { day: 12, plates: [8, 9] },
];

const calculateCovidFullRestrition = (day, plateNumber) =>
  covidRestriction.find(
    restrictionDay => restrictionDay.day === day && restrictionDay.plates.includes(plateNumber),
  );

const calculateCovidRestriction = (day, plateNumber) => {
  if (day >= 4 && day <= 7) {
    return !((plateNumber % 2 === 0 && day % 2 === 1) || (plateNumber % 2 === 1 && day % 2 === 0));
  }
  return !calculateCovidFullRestrition(day, plateNumber);
};

export const calculateRestriction = (date, plateNumber) =>
  date.getMonth() === 3 && date.getDate() >= 4
    ? calculateCovidRestriction(date.getDate(), plateNumber)
    : false;
