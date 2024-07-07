const LoaderType ={
    Texture : 'Texture',
    GLTF : 'GLTF',
    RGBE : 'RGBE',
    MESH : 'Mesh',
}

export default [
    // { name: 'sceneLoad',  type: LoaderType.RGBE, path: '../img/sky.hdr' },
    { name: 'roadMesh',  type: LoaderType.Texture, path: '../img/banmaxian.jpg' },
    { name: 'otherCarLoad',  type: LoaderType.GLTF, path: '../models/gltf/otherCar.glb' },
    // { name: 'carLoad',  type: LoaderType.GLTF, path: '../models/gltf/su7-car.glb' },
    { name: 'carLoad',  type: LoaderType.GLTF, path: '../models/gltf/su7-car_edit.glb' },
    { name: 'carCurveLoad',  type: LoaderType.GLTF, path: '../models/gltf/xiedu.glb' },
    { name: 'cubeGround',  type: LoaderType.GLTF, path: '../models/gltf/cubeGround.glb' },
    { name: 'tunnelLoader',  type: LoaderType.GLTF, path: '../models/gltf/tunnel.glb' }
]
