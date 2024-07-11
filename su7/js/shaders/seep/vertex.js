export const vertexShader = /* GLSL */ `
                      uniform float iTime;
                      uniform vec3 iResolution;
                      uniform vec4 iMouse;
                      uniform float uOpacity;

                      varying vec2 vUv;

                      void main() {
                        vec3 p=position;
                        gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);

                          vUv = uv;
                      }
                `;
