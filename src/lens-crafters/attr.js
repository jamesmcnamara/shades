export default name => ({
    get: obj => obj[name],
    mod: f => obj => ({...obj, [name]: f(obj[name])})
})
