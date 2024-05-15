varying vec2 vUv;

void main() {
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec3 new_position = vec3(position.x, position.y, position.z)* vec3(2,2,2);
    gl_Position = vec4( new_position, 1.0 );
}
