function clrMesh(){
    meshArr.forEach(m=>{
        m.geometry.dispose();
        m.material.dispose();
        delete m;
        scene3d.remove(m);
    });
    meshArr=[];
}

function draw3d(jsonObj){
    clrMesh();

    for(keys in jsonObj){
        var obj=jsonObj[keys];
        var params=[];
        for(var i=0; i<obj.params.length; i++){
            params.push(eval((obj[obj.params[i]])));
        }
        try{
            var func=window[obj.func](params);
        }catch(Exception){}
    }

    for(var i=0; i<meshArr.length; i++){
        scene3d.add(meshArr[i]);
    }

    render();
}



