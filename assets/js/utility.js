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

function toogleSeries(seriesId, targetId) {
    const series = document.getElementById(seriesId);
    const children = series.children;
    for (const child of children) {
        child.setAttribute('hidden', '');
    }
    const target = document.getElementById(targetId);
    target.removeAttribute('hidden');
}

export { createState, toogleSeries };