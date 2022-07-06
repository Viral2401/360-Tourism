uniform sampler2D scene360;
uniform sampler2D sceneplanet;
// uniform sampler2D uScene;
// uniform sampler2D uSceneEarth;
uniform float progress;
float pi = 3.14159265;
varying vec2 vUv;
varying vec2 vUvEarth;

vec2 distort(vec2 olduv,float pr,float expo){

    vec2 p0 = 2.*olduv - 1.;

    vec2 p1 = p0/(1. - pr*length(p0)*expo);


    return (p1 + 1.)*0.5;

}





void main(){

vec2 uv1 = distort(vUv,-10.*progress,progress*4.);
vec2 uv2 = distort(vUv,-10.*(1.-progress),progress*4.);
vec4 texturecolor = texture2D(scene360,uv2);
vec4 texturecolorEarth = texture2D(sceneplanet,uv1);
float mixer = smoothstep(cos(vUv.y*0.5),vUv.y*0.3,progress);

vec4 finalTexture = mix(texturecolor,texturecolorEarth,mixer);

gl_FragColor = finalTexture;    
// gl_FragColor = texturecolor;    

// gl_FragColor = texturecolorEarth;    


}