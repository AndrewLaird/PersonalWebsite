//FRAGMENT SHADER
uniform float time;
uniform vec2 u_resolution;

// --- noise from procedural pseudo-Perlin (better but not so nice derivatives) ---------
                    // ( adapted from IQ )

float noise3( vec3 x ) {
    vec3 p = floor(x),f = fract(x);

    f = f*f*(3.-2.*f);  // or smoothstep     // to make derivative continuous at borders

    #define hash3(p)  fract(sin(1e3*dot(p,vec3(1,57,-13.7)))*4375.5453)        // rand
    
    return mix( mix(mix( hash3(p+vec3(0,0,0)), hash3(p+vec3(1,0,0)),f.x),       // triilinear interp
                    mix( hash3(p+vec3(0,1,0)), hash3(p+vec3(1,1,0)),f.x),f.y),
                mix(mix( hash3(p+vec3(0,0,1)), hash3(p+vec3(1,0,1)),f.x),       
                    mix( hash3(p+vec3(0,1,1)), hash3(p+vec3(1,1,1)),f.x),f.y), f.z);
}

#define noise(x) (noise3(x)+noise3(x+11.5)) / 2. // pseudoperlin improvement from foxes idea 



void main() {
    // set the fragment color based on position
    vec2 uv = ((gl_FragCoord.xy / u_resolution.xy));
    if (uv.x > 0.5) {
        gl_FragColor = vec4(0.3, 0.5, 0.1, 1.0);
    }
    else if (uv.y > 0.5) {
        gl_FragColor = vec4(0.7, 0.3, 0.8, 1.0);
    }
    else{
        gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
    }
}
