import { calculateWeekendRestriction, calculateWeekDayRestriction } from './calculateRestriction.js';

const isWeekend = (day) => day === 0 || day === 6;

export const getRestrictionInfo = plateNumber =>  {
	const week = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
	const noRestriction = []; const regular = []; const full = [];

	week.forEach((day, index) => {
		if (isWeekend(index)) {
			if(!calculateWeekendRestriction(index, plateNumber)) {
				regular.push(day)
			}
			else {
				full.push(day)
			}
		}
		else if (!isWeekend(index) && calculateWeekDayRestriction(index, plateNumber)) {
			full.push(day)
		}
		else {
			noRestriction.push(day)
		}
	})

	return plateNumber ? {
		noRestriction,
		regular,
		full
	} : null
}