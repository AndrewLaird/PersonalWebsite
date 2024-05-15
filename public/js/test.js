import * as THREE from 'three';

var uniforms;
async function loadShaders() {
    const vertexShaderURL = '/public/glsl/vertex_test.glsl';
    const fragmentShaderURL = '/public/glsl/fragment_test.glsl';

    try {
        // Fetch the vertex shader
        const vertexShaderResponse = await fetch(vertexShaderURL);
        const vertexShaderText = await vertexShaderResponse.text();
        document.getElementById('vertexShader').textContent = vertexShaderText;

        // Fetch the fragment shader
        const fragmentShaderResponse = await fetch(fragmentShaderURL);
        const fragmentShaderText = await fragmentShaderResponse.text();
        document.getElementById('fragmentShader').textContent = fragmentShaderText;

        // Now that shaders are loaded, proceed with your main code
        main();
    } catch (error) {
        console.error('Error loading shaders:', error);
    }
}

function main() {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 0, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );



    // Create geometry
    var geometry = new THREE.PlaneGeometry(100, 100);

    // Load shaders from glsl files
    // Get vertex and fragment shader code from embedded script tags
    var vertexShader = document.getElementById('vertexShader').textContent;
    var fragmentShader = document.getElementById('fragmentShader').textContent;

    uniforms = {
        time: { value: 1.0 },
        u_resolution: { xy: [window.innerWidth/window.innerHeight] }
    };


    // Create material with shaders
    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    // Create mesh with geometry and material
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animate() {
        requestAnimationFrame( animate );
        uniforms.time.value += 0.05;
        uniforms.u_resolution.value = [window.innerWidth, window.innerHeight];
        renderer.render( scene, camera );
    }
    animate();
}
loadShaders();
