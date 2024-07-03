import { GLTFLoader }  from './GLTFLoader.js';
import { RGBELoader } from './RGBELoader.js';
import {TextureLoader} from '../3d/three.module.js'

export default class Loader {
    constructor(){
        this.resources = {}
        this.total = 0
        this.totalSuccess = 0
        this.totalFail = 0
        this.gltfLoader = new GLTFLoader()
        this.rgbeLoader = new RGBELoader()
        this.textureLoader = new TextureLoader()
        this.fileLoaded = null
        this.loadEnd = null
    }
    load(resources){
        this.total += resources.length
        for (const resource of resources) {
            this.#loadResource(resource)
        }
    }
    #loadResource(resource){
        const type = resource.type

        if (!type) {
            console.warn('type is required')
            return
        }
        let loader

        switch (type) {
            case 'GLTF':
                loader = this.gltfLoader
                break
            case 'Texture':
                loader = this.textureLoader
                break
            case 'RGBE':
                loader = this.rgbeLoader
                break
            default:
                loader = this.textureLoader
        }

        loader.load(
            resource.path,
            res => { this.#loadSuccess(resource, res) },
            undefined,
            res => { this.#loadFail(resource, res) }
        )
    }
    onFileLoaded (callback) {
        this.fileLoaded = callback
    }

    onLoadEnd (callback) {
        this.loadEnd = callback
    }
    #loadSuccess (resource, res) {
        this.totalSuccess++

        const name = resource.name
        this.resources[name] = res

        this.fileLoaded && this.fileLoaded(name, res)

        if (this.total === this.totalSuccess + this.totalFail) {
            this.loadEnd && this.loadEnd(this.resources)
        }

    }
    #loadFail (resource, res) {
        console.warn(`resource ${resource.name} load fail`, res)
        this.totalFail++

        if (this.total === this.totalSuccess + this.totalFail) {
            this.loadEnd(this.resources)
        }
    }
}
