export default name => ({
    get: obj => obj[name],
    mod: f => (obj, ...params) => ({...obj, [name]: f(obj[name], ...params)})
})
