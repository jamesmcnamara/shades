export default index => ({
    get: arr => arr[index],
    mod: f => arr => arr.slice(0, index).concat(f(arr[index])).concat(arr.slice(index + 1))
})
