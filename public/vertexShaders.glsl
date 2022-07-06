varying vec2 vUv;
varying vec2 vUvEarth;


void main(){
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); 

    vUv = uv;
    vUvEarth = uv;


}