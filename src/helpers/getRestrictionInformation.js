const restrictionsPerPlate = [
	{
		plateNumber: 0,
		noRestriction: [5,7],
		regular: [8],
		full: [4,6,9,10,11,12]
	},
	{
		plateNumber: 1,
		noRestriction: [4,6],
		regular: [8],
		full: [5,7,9,10,11,12]
	},
	{
		plateNumber: 2,
		noRestriction: [5,7],
		regular: [9],
		full: [4,6,8,10,11,12]
	},
	{
		plateNumber: 3,
		noRestriction: [4,6],
		regular: [9],
		full: [5,7,8,10,11,12]
	},
	{
		plateNumber: 4,
		noRestriction: [5,7],
		regular: [10],
		full: [4,6,8,9,11,12]
	},
	{
		plateNumber: 5,
		noRestriction: [4,6],
		regular: [10],
		full: [5,7,8,9,11,12]
	},
	{
		plateNumber: 6,
		noRestriction: [5,7],
		regular: [11],
		full: [4,6,8,9,10,12]
	},
	{
		plateNumber: 7,
		noRestriction: [4,6],
		regular: [11],
		full: [5,7,8,9,10,12]
	},
	{
		plateNumber: 8,
		noRestriction: [5,7],
		regular: [12],
		full: [4,6,8,9,10,11]
	},
	{
		plateNumber: 9,
		noRestriction: [4,6],
		regular: [12],
		full: [5,7,8,9,10,11]
	}
];

export const getRestrictionInfo = plateNumber =>  
  restrictionsPerPlate.find(restrictionDataSet => 
    restrictionDataSet.plateNumber == plateNumber);
