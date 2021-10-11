function createState(init, runner) {
    const handler = {
        get: function (obj, prop) {
            return obj[prop]
        },
        set: function (obj, prop, value) {
            obj[prop] = value
            runner[prop](value)
            return true
        }
    };

    return new Proxy(init, handler)
}

export { createState };