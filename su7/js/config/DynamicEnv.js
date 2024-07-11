import * as THREE from "../3d/three.module.js";
import {vertexShader as dynamicEnvVertexShader } from "../shaders/DynamicEnv/vert.js";
import {fragmentShader as dynamicEnvFragmentShader } from "../shaders/DynamicEnv/frag.js";
import {FullScreenQuad} from '../postprocessing/Pass.js'

import FBO from "./FBO.js";

export default class DynamicEnv{
    renderer;
    fbo;
    material;
    constructor(renderer,config) {
        const { envmap1, envmap2 } = config;
        const envData = envmap1?.source.data;

        this.fbo = new FBO({},{
            width: envData.width,
            height: envData.height,
        });
        this.envMap.mapping = THREE.CubeUVReflectionMapping;

        this.material = new THREE.ShaderMaterial({
            vertexShader: dynamicEnvVertexShader,
            fragmentShader: dynamicEnvFragmentShader,
            uniforms: {
                uEnvmap1: {
                    value: envmap1,
                },
                uEnvmap2: {
                    value: envmap2,
                },
                uWeight: {
                    value: 0,
                },
                uIntensity: {
                    value: 1,
                },
            },
        });
        this.quad = new FullScreenQuad(this.material)

        this.renderer = renderer
    }
    get envMap() {
        return this.fbo.rt.texture;
    }
    update() {
        this.renderer.setRenderTarget(this.fbo.rt);
        this.quad.render(this.renderer);
        this.renderer.setRenderTarget(null);
    }
    setWeight(value) {
        this.material.uniforms.uWeight.value = value;
    }
    setIntensity(value) {
        this.material.uniforms.uIntensity.value = value;
        this.update()
    }
}
