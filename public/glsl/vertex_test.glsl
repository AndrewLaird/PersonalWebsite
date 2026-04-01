//VERTEX SHADER

// Vertex shader to scale the cube
// Right now it just falattens it into xy
uniform float time;
void main() {
    gl_Position = vec4( position.xy, 0.0, 1.0 );
}
