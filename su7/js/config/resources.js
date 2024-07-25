const LoaderType ={
    Texture : 'Texture',
    GLTF : 'GLTF',
    RGBE : 'RGBE',
    MESH : 'Mesh',
}

export default [
    { name: 'env_night',  type: LoaderType.RGBE, path: './models/t_env_night.hdr' },
    { name: 'env_light',  type: LoaderType.RGBE, path: './models/t_env_light.hdr' },
    { name: 'roadMesh',  type: LoaderType.Texture, path: './img/banmaxian.jpg' },
    { name: 'otherCarLoad',  type: LoaderType.GLTF, path: './models/gltf/otherCar.glb' },
    { name: 'windLine',  type: LoaderType.GLTF, path: './models/gltf/wind_line.glb' },
    { name: 'carLoad',  type: LoaderType.GLTF, path: './models/gltf/su7-car_edit.glb' },
    { name: 'carCurveLoad',  type: LoaderType.GLTF, path: './models/gltf/xiedu.glb' },
    { name: 'cubeGround',  type: LoaderType.GLTF, path: './models/gltf/cubeGround.glb' },
    { name: 'tunnelLoader',  type: LoaderType.GLTF, path: './models/gltf/tunnel.glb' },
    { name: 'roadLoader',  type: LoaderType.GLTF, path: './models/gltf/road.glb' }
]
