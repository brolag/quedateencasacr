const restriction = [
    { day: 1, plates: [1,2] },
    { day: 2, plates: [3,4] },
    { day: 3, plates: [5,6] },
    { day: 4, plates: [7,8] },
    { day: 5, plates:  [0,9] }
]

const covidRestriction = [
    { day: 8, plates:  [0,1] },
    { day: 9, plates:  [2,3] },
    { day: 10, plates: [4,6] },
    { day: 11, plates: [6,7] },
    { day: 12, plates: [8,9] }
]

const calculateOrdinaryRestriction = (day, plateNumber) => {
    const result = restriction.filter(restriction => 
        restriction.day === day &&
        restriction.plates.includes(plateNumber))
        
    return result.length > 0
}

const calculateCovidRestriction = (day, plateNumber) => {
    if (day >= 4 && day <= 7 ) {
        return (plateNumber % 2 === 0 && day % 2 === 1) ||
               (plateNumber % 2 === 1 && day % 2 === 0)
    }
    return calculateCovidFullRestrition(day, plateNumber);

}

const calculateCovidFullRestrition = (day, plateNumber) => {
    return covidRestriction.filter(restriction => 
        restriction.day === day &&
        restriction.plates.includes(plateNumber)
    ).length > 0;
}

export const calculateRestriction = (date, plateNumber) => {
    if (date.getMonth() === 3 && date.getDate() >= 4) {
        return calculateCovidRestriction(date.getDate(), plateNumber)
    }
    return false
}
