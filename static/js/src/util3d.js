var shapeFromPoints = (pts) => {
    var s = new THREE.Shape();
    s.moveTo(pts[0].x, pts[0].y);
    pts.forEach((p) => {
        s.lineTo(p.x, p.y);
    });
    s.autoClose = true;
    return s;
}

var f0 = (params) => {
    var p = params[0];
    var l = params[1];
    var w = params[2];
    var h = params[3];
    var pts = [
        { "x": p.x - l / 2, "y": p.y - w / 2 },
        { "x": p.x + l / 2, "y": p.y - w / 2 },
        { "x": p.x + l / 2, "y": p.y + w / 2 },
        { "x": p.x - l / 2, "y": p.y + w / 2 }
    ];
    var s = shapeFromPoints(pts);
    var e = {
        steps: 1,
        depth: h,
        bevelEnabled: false
    };
    var g = new THREE.ExtrudeBufferGeometry(s, e);
    var m = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        opacity: 0.75,
        transparent: true
    })
    var me = new THREE.Mesh(g, m);
    meshArr.push(me);
}

var f1 = (params) => {
    var pts = [params[0], params[1]];
    var d = params[3];

    var p = { "x": pts[0].x - d / 2, "y": pts[0].y - d / 2 };
    var q= { "x": pts[1]}

    var ht = params[2];
    var s = shapeFromPoints(pts);
    var e = {
        steps: 1,
        depth: ht,
        bevelEnabled: false
    }
    var g = new THREE.ExtrudeBufferGeometry(s, e);
    var m = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        opacity: 0.75,
        transparent: true
    });
    var me = new THREE.Mesh(g, m);
    meshArr.push(me);
}

function f2(params) {
    var pts = params[0];
    var ht = params[1];
    var s = shapeFromPoints(pts);
    var e = {
        steps: 1,
        depth: ht,
        bevelEnabled: false
    }
    var g = new THREE.ExtrudeBufferGeometry(s, e);
    var m = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        opacity: 0.75,
        transparent: true,
        side: THREE.DoubleSide
    });
    var me = new THREE.Mesh(g, m);
    meshArr.push(me);
}
