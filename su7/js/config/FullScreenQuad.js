import {OrthographicCamera,PlaneGeometry} from "../3d/three.module.js";
export default class FullScreenQuad{
    camera;
    geometry;
    mesh;
    constructor(material) {
        this.camera = new OrthographicCamera();
        this.geometry = new PlaneGeometry();
        this.mesh = null;
    }
    get material() {
        return this.mesh ? this.mesh.material : null;
    }
    dispose() {
        if (this.mesh) {
            this.mesh.dispose();
            this.mesh = null;
        }
    }
    render(renderer) {
        if (this.mesh) {
            renderer.render(this.mesh, this.camera);
        }
    }
}
