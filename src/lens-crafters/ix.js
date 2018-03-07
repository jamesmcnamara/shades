import attr from './attr'

export default index => ({
    get: arr => arr[index],
    mod: f => (arr, ...params) => do {
        if (Array.isArray(arr)) 
            arr.slice(0, index).concat(f(arr[index], ...params)).concat(arr.slice(index + 1))
        else 
            attr(index).mod(f)(arr)
    },
    traversal: false,
})
