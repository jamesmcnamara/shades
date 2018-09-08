import { into } from '../function'

export const foldOf = f => field => {
    const getter = into(field)
    return (acc, curr) => f(acc,  curr, getter)
}

export const maxOf = foldOf((acc, curr, getter) => getter(curr) > getter(acc) ? curr : acc)


export const minOf = foldOf((acc, curr, getter) => getter(curr) < getter(acc) ? curr : acc)


export const findOf = foldOf((acc, curr, getter) => getter(acc) ? acc : (getter(curr) ? curr : null))


export const sumOf = foldOf((acc, curr, getter) => getter(curr) + acc)


export const mulOf = foldOf((acc, curr, getter) => getter(curr) * acc)
