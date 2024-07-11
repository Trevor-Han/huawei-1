import * as THREE from "../3d/three.module.js";
export default class FBO {
    width;
    height;
    rt;
    constructor(base, config = {}) {

        const defaultConfig = {
            width: 1,
            height: 1,
            samples: 0,
            depth: false,
            options: {}
        };

        const mergedConfig = Object.assign({}, defaultConfig, config);

        this.width = mergedConfig.width;
        this.height = mergedConfig.height;

        const options = Object.assign({}, mergedConfig.options, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            stencilBuffer: false
        });

        if (mergedConfig.depth) {
            options.depthBuffer = true;
        }

        if (mergedConfig.samples > 0) {
            options.samples = mergedConfig.samples;
        }

        this.rt = new THREE.WebGLRenderTarget(mergedConfig.width, mergedConfig.height, options);
    }

    get actualWidth() {
        return this.width;
    }

    get actualHeight() {
        return this.height;
    }

}
