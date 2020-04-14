const restrictionDays = [
  { day: 1, plates: [1, 2] },
  { day: 2, plates: [3, 4] },
  { day: 3, plates: [5, 6] },
  { day: 4, plates: [7, 8] },
  { day: 5, plates: [9, 0] },
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
