// fill the empty inner arrays with a fillVal
const fillEmptyWith = (arr, fillVal) => arr.map(val => ((val === undefined) || (val.length === 0)) ? fillVal : val)

export default fillEmptyWith