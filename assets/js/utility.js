function createDomObject(tag, attributes) {
    const item = document.createElement(tag);
    for (const prop in attributes) {
        item.setAttribute(prop, attributes[prop]);
    }
    return item
}

function createState(init = {}) {
    const runner = {}
    const handler = {
        get: function (obj, prop) {
            return obj[prop]
        },
        set: function (obj, prop, value) {
            if (obj.hasOwnProperty(prop)) {
                if (value instanceof Object && Object.getPrototypeOf(value) == Object.prototype) {
                    obj[prop] = Object.assign(obj[prop], value)
                } else {
                    obj[prop] = value;
                }

                if (prop in runner) {
                    for (const f of runner[prop]) {
                        f(value);
                    }
                } else {
                    runner[prop] = []
                }
            }
            return true;
        }
    }

    const copy = deep(init)
    Object.defineProperty(copy, 'addStateListener', {
        value: function (prop, listener) {
            if (!(prop in runner)) {
                runner[prop] = []
            }
            runner[prop].push(listener)
        }
    });

    Object.defineProperty(copy, 'runStateListener', {
        value: function (prop, value) {
            if (prop in runner) {
                for (const f of runner[prop]) {
                    f(value);
                }
            } else {
                runner[prop] = []
            }
        }
    });

    for (const [key, val] of Object.entries(deep(init))) {
        if (val instanceof Object && Object.getPrototypeOf(val) == Object.prototype) {
            const obj = createState(val)
            copy[key] = obj
        }
    }

    return new Proxy(copy, handler)
}

function deep(object) {
    return JSON.parse(JSON.stringify(object))
}


function loremIpsum(text, len) {
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    if (text && text.length > 1) {
        return text
    } else {
        return helper(text, len)
    }

    function helper(text, len) {
        if (typeof text == 'string') {
            return lorem.substring(0, len)
        } else if (Array.isArray(text)) {
            return lorem.split(' ').slice(0, len)
        } else {
            return lorem.split(' ').slice(0, len)
        }
    }
}

function toogleSeries(seriesId, targetId) {
    const series = document.getElementById(seriesId);
    const children = series.children;
    for (const child of children) {
        child.setAttribute('hidden', '');
    }
    const target = document.getElementById(targetId);
    target.removeAttribute('hidden');
}



export { createDomObject, createState, deep, loremIpsum, toogleSeries };