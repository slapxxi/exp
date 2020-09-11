varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vNormal = normal;
  vPosition = position;
  
  gl_Position = projectionMatrix * vec4(vPosition, 1.0);
}