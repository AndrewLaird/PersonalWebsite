uniform sampler2D iChannel0;
uniform vec2 iResolution;
uniform float time;

varying vec2 vUv;

float hash3(float n) {
    return fract(sin(n) * 43758.5453);
}

float noise3(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    float n = p.x + p.y * 57.0 + 113.0 * p.z;
    float res = mix(mix(mix(hash3(n + 0.0), hash3(n + 1.0), f.x),
                        mix(hash3(n + 57.0), hash3(n + 58.0), f.x), f.y),
                    mix(mix(hash3(n + 113.0), hash3(n + 114.0), f.x),
                        mix(hash3(n + 170.0), hash3(n + 171.0), f.x), f.y), f.z);
    return res;
}


float noise(vec3 x) {
    float n = noise3(x);
    float m = noise3(x + vec3(11.5));
    return (n + m) / 2.0;
}

void main() {
    vec2 R = iResolution.xy;
    vec2 U = vUv;
    float n = noise(vec3(U * 8.0 / R.y, 0.1 * time));
    float v = sin(6.28 * 10.0 * n);
    float t = time;
    v = smoothstep(1.0, 0.0, 0.5 * abs(v) / fwidth(v));
    
    vec4 color = texture2D(iChannel0, U);
    /*mix(exp(-33.0 / R.y) * texture2D(iChannel0, (U + vec2(1.0, sin(t))) / R),*/
                     /*0.5 + 0.5 * sin(12.0 * n + vec4(0.0, 2.1, -2.1, 0.0)),*/
                     /*v);*/
    
    vec2 uv = vec2(gl_FragCoord.x / iResolution.x, gl_FragCoord.y / iResolution.y);
    
    // Calculate color based on UV coordinates
    vec3 color = mix(vec3(1.0), vec3(0.5, 0.0, 0.5), uv.y);

    // Output final color
    gl_FragColor = vec4(color, 1.0);
}

