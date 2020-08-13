function init() {
    var div=document.getElementById('main3d');
    while(div.hasChildNodes()){
        div.removeChild(div.firstChild);
    }

    scene3d = new THREE.Scene();
    scene3d.background = new THREE.Color('#FFFAFA');

    camera3d = new THREE.PerspectiveCamera(45, 1.0, 0.01, 1000);
    camera3d.up=new THREE.Vector3(0,0,1);
    camera3d.position.set(10, 10, 10);

    renderer3d = new THREE.WebGLRenderer({antialias:true});
    renderer3d.setSize(WIDTH,HEIGHT);

    var axes = new THREE.AxesHelper(5);
    scene3d.add(axes);

    div.appendChild(renderer3d.domElement);
    document.getElementById("main3d").style.display="block";

    controls3d = new THREE.OrbitControls(camera3d, renderer3d.domElement);
    controls3d.addEventListener('change', render);

    addLight();
    //render();
}

function addLight(){
    var light=new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10,10,5);
    scene3d.add(light);
}

function onWindowResize() {
    /* WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight; */
    camera3d.aspect = 1.0;
    camera3d.updateProjectionMatrix();
    renderer3d.setSize(WIDTH, HEIGHT);
}

function render() {
    onWindowResize();
    renderer3d.render(scene3d, camera3d);
}