import * as THREE from 'three';


var uniforms;

// Generate a random gradient texture
function gradientTexture() {
    // Create a canvas element
    var canvas = document.createElement('canvas_2');
    canvas.width = 256; // Adjust the size as needed
    canvas.height = 256;
    var ctx = canvas.getContext('2d');

    // Create a gradient
    var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'white'); // Start color (white)
    gradient.addColorStop(1, 'purple'); // End color (purple)

    // Fill the canvas with the gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create a texture from the canvas
    var texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true; // Ensure the texture is updated

    return texture;
}

// Generate a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

async function loadShaders() {
    const vertexShaderURL = '/public/glsl/isovalues_vertex_example.glsl';
    const fragmentShaderURL = '/public/glsl/isovalues_fragment_example.glsl';

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
    const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );



    // Create geometry
    var geometry = new THREE.BoxGeometry();

    // Load shaders from glsl files
    // Get vertex and fragment shader code from embedded script tags
    var vertexShader = document.getElementById('vertexShader').textContent;
    var fragmentShader = document.getElementById('fragmentShader').textContent;
    console.log(vertexShader);
    console.log(fragmentShader);
    // Generate the random gradient texture
    var gradientTexture = gradientTexture();
    console.log(gradientTexture);


    uniforms = {
        time: { value: 1.0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iChannel0: gradientTexture,
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
        requestAnimationFrame(animate);
        uniforms.time.value += 0.05;
        uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }
    animate();
}
loadShaders();

