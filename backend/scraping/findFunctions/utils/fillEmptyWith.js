// fill the empty inner arrays with a fillVal
const fillEmptyWith = (arr, fillVal) => arr.map(val => val.length > 0 ? val : new Array(1).fill(fillVal))

export default fillEmptyWith