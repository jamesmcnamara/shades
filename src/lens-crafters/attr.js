export default name => ({
    get: obj => obj[name],
    mod: f => (obj, ...params) => do {
        if (Array.isArray(obj)) {
            obj.slice(0, name).concat(f(obj[name], ...params)).concat(obj.slice(name + 1))
        }
        else {
            ({...obj, [name]: f(obj[name], ...params)})
        }
    },
    traversal: false,
})
