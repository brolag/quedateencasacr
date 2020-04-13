const restrictionDays = [
  { day: 1, plates: [0, 1] },
  { day: 2, plates: [2, 3] },
  { day: 3, plates: [4, 5] },
  { day: 4, plates: [6, 7] },
  { day: 5, plates: [8, 9] },
];

export const calculateWeekendRestriction = (day, plateNumber) => {
  if (day === 0) return (plateNumber % 2 > 0)
  if (day === 6) return (plateNumber % 2 === 0)
  
  return false
}
  

export const calculateWeekDayRestriction = (day, plateNumber) => 
  !!restrictionDays.find(restrictionDay => restrictionDay.day === day).plates.includes(plateNumber)

export const calculateRestriction = (day, plateNumber) => 
  day > 0 && day < 6 
  ? calculateWeekDayRestriction(day, plateNumber)
  : calculateWeekendRestriction(day, plateNumber) 
