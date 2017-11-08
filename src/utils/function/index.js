import { cons } from '../list'

export const identity = a => a

export const curry = n => f => _curry(n, f)

function _curry(n, f, args = []) {
    return arg => do {
        if (n)
            _curry(n, f, cons(arg)(args))
        else
            f(...args)
    }
}

export const flip = f => a => b => f(b)(a)

export const always = a => b => a

export const not = f => (...args) => !f(...args)

export const and = (...fs) => (...args) => fs.reduce((acc, f) => acc && f(...args), true)

export const or = (...fs) => (...args) => fs.reduce((acc, f) => acc || f(...args), false)

export const pipe = (...fs) => (args) => fs.reduce((acc, f) => f(acc), args)
