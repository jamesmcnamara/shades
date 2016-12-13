export const identity = a => a

export const toggle =  bool => !bool

export const not = f => (...args) => !f(...args)

export const inc = num => num + 1

export const always = a => b => a

export const cons = x => xs => ([...xs, x])

export const pipe = (...fs) => (args) => fs.reduce((acc, f) => f(acc), args)

const every = arr => {
    for (let elem of arr) {
        if (!elem) {
            return false
        }
    }
    return true
}

export const has = pattern => obj => 
    every(Object.keys(pattern).map(key => do {
        if (typeof pattern[key] === 'object' && typeof obj[key] === 'object' && pattern[key] !== null)
           has(pattern[key])(obj[key]) 
        else
            obj[key] === pattern[key]
    }))
