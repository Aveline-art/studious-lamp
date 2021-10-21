function createState(init = {}) {
    const runner = {}
    const handler = {
        get: function (obj, prop) {
            return obj[prop]
        },
        set: function (obj, prop, value) {
            obj[prop] = value;
            if (prop in runner) {
                for (const f of runner[prop]) {
                    f(value);
                }
            } else {
                runner[prop] = []
            }
            return true;
        }
    }

    Object.defineProperty(init, 'addStateListener', {
        value: function(prop, listener) {
            if (!(prop in runner)) {
                runner[prop] = []
            }
            runner[prop].push(listener)
        }
    });

    return [new Proxy(init, handler), runner]
}

function createNestedState(dict, dictRunner, key, init = {}) {
    dictRunner[key] = []
    
    const handler = {
        get: function (obj, prop) {
            return obj[prop]
        },
        set: function (obj, prop, value) {
            obj[prop] = value;
            if (key in dictRunner) {
                for (const f of dictRunner[key]) {
                    f(dict[key]);
                }
            } else {
                dictRunner[prop] = []
            }
            return true;
        }
    }

    dict[key] = new Proxy(init, handler)
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

function createDomObject(tag, attributes) {
    const item = document.createElement(tag);
    for (const prop in attributes) {
        item.setAttribute(prop, attributes[prop]);
    }
    return item
}

function deep(object) {
    return JSON.parse(JSON.stringify(object))
}



export { createState, createNestedState, toogleSeries, createDomObject, deep };