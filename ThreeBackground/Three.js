// Canvas name is canvas
window.onload = function(){
    console.log("loaded");
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,10000);
    camera.position.z = 5;

    var renderer = new THREE.WebGLRenderer({antialias: true});
    console.log(scene,camera,renderer);

    renderer.setClearColor("#f5f1ed");
    renderer.setSize(window.innerWidth,window.innerHeight);


    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth,window.innerHeight);
        camera.aspect = (window.innerWidth/window.innerHeight);

        camera.updateProjectionMatrix();
    });



    var geometry = new THREE.BoxGeometry(1,1,1);
    var material = new THREE.MeshLambertMaterial({color:0x00FF00});

    var mesh = new THREE.Mesh(geometry,material);

    scene.add(mesh);

    var light = new THREE.PointLight(0xFFFFF,1,500);
    light.position.set(10,0,25);
    scene.add(light);

    var render = function() {
        // request animation frame asks the browser to call it agin
        // when its reasonable
        requestAnimationFrame(render);
        mesh.rotation.x += .01;
        mesh.rotation.y += .02;

        renderer.render(scene, camera);

    }

    render();

    renderer.render(scene, camera);
};
