// Canvas name is canvas
window.onload = function(){
    console.log("loaded");
    var canvas = document.getElementById("Canvas");
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(75, window.innerWith/window.innerHeight,0.1,10000);

    var renderer = new THREE.WebGLRENDER({antialias: true});
    renderer.setClearCode("#000000");//"#f5f1ed");

    renderer.setSize(window.innerWith,window.innerHeight);


    document.body.appendChild(renderer.domElement);

};
