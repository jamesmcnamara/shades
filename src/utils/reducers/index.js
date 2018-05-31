import { into } from '../function'

export const foldBy = f => field => {
    const getter = into(field)
    return (acc, curr) => f(acc,  curr, getter)
}

export const maxBy = foldBy((acc, curr, getter) => getter(curr) > getter(acc) ? curr : acc)


export const minBy = foldBy((acc, curr, getter) => getter(curr) < getter(acc) ? curr : acc)


export const findBy = foldBy((acc, curr, getter) => getter(acc) ? acc : (getter(curr) ? curr : null))


export const sumBy = foldBy((acc, curr, getter) => getter(curr) + acc)


export const mulBy = foldBy((acc, curr, getter) => getter(curr) * acc)
