import { flip } from '../function'

export const add = a => b => a + b

export const sub = a => b => a - b

export const inc = num => num + 1

export const dec = num => num - 1

export const incBy = add

export const decBy = flip(sub)
