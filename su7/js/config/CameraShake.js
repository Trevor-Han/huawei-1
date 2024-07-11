import * as THREE from "../3d/three.module.js";
import {SimplexNoise} from '../math/SimplexNoise.js'

const simplex = new SimplexNoise();
const fbm = ({
                 octave = 3,
                 frequency = 2,
                 amplitude = 0.5,
                 lacunarity = 2,
                 persistance = 0.5,
             } = {}) => {
    let value = 0;
    for (let i = 0; i < octave; i++) {
        const noiseValue = simplex.noise(frequency, frequency); // 升高频率，降低振幅
        // 增加噪声值，使其更加明显
        value += noiseValue * amplitude;
        frequency *= lacunarity;
        amplitude *= persistance;
    }
    return value;
};

export default class CameraShake{
    constructor(config) {
        this.intensity = 1;
        this.tweenedPosOffset = new THREE.Vector3(0, 0, 0);
    }
    update() {
        const t = new THREE.Clock().getElapsedTime();
        const posOffset = new THREE.Vector3(
            fbm({
                frequency: t * 0.5 + THREE.MathUtils.randFloat(-10000, 0),
                amplitude: 2,
            }),
            fbm({
                frequency: t * 0.5 + THREE.MathUtils.randFloat(-10000, 0),
                amplitude: 2,
            }),
            fbm({
                frequency: t * 0.5 + THREE.MathUtils.randFloat(-10000, 0),
                amplitude: 2,
            })
        );

        posOffset.multiplyScalar(0.1 * this.intensity);
        gsap.to(this.tweenedPosOffset, {
            x: posOffset.x,
            y: posOffset.y,
            z: posOffset.z,
            duration: 1,
        });
    }
    setIntensity(value) {
        this.intensity = value;
    }
}
