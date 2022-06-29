const toObject = (keys, values) => keys.reduce((obj, k, i) => ({ ...obj, [k]: values[i] }), {})

export default toObject