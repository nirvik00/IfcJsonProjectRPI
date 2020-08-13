function p(x, y) {
    var p = {
        "x": x,
        "y": y
    };
    return p;
}

function v(p, q) {
    var v = {
        "x": q.x - p.x,
        "y": q.y - p.y
    };
    return v;
}

function unitV(p, q) {
    var d = Math.sqrt((q.x - p.x) * (q.x - p.x) + (q.y - p.y)(q.y - p.y));
    var u = {
        "x": (q.x - p.x) / d,
        "y": (q.y - p, y) / d,
    };
    return u;
}

function unitV(p) {
    var d = Math.sqrt(p.x * p.x + p.y * p.y);
    var u = {
        "x": p.x / d,
        "y": p.y / d
    }
    return u;
}

function normalToV1(u) {
    var v = {
        "x": u.y,
        "y": -u.x
    }
    return v;
}

function normalToV2(u) {
    var v = {
        "x": -u.y,
        "y": u.x
    }
    return v;
}

function scaleVector(u, d) {
    var v = {
        "x": u.x * d,
        "y": u.y * d
    }
}