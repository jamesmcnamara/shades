import isArray from 'is-array'
import attr from './attr'

export default index => ({
    get: arr => arr[index],
    mod: f => arr => do {
        if (isArray(arr)) 
            arr.slice(0, index).concat(f(arr[index])).concat(arr.slice(index + 1))
        else 
            attr(index).mod(f)(arr)
    }
})
