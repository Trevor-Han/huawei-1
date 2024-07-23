const MeshColor = [
    {
        src: '/su7/img/mesh/b1.webp',
        color: '#26d6e9'
    },
    {
        src: '/su7/img/mesh/b2.webp',
        color: "#444c3c"
    },
    {
        src: '/su7/img/mesh/b3.webp',
        color: "#5d5d5d"
    },
    {
        src: '/su7/img/mesh/b4.webp',
        color: "#8a8a8a"
    },
    {
        src: '/su7/img/mesh/b5.webp',
        color: "#3e3543"
    },
    {
        src: '/su7/img/mesh/b6.webp',
        color: "#822817"
    },
    {
        src: '/su7/img/mesh/b7.webp',
        color: "#354860"
    },
    {
        src: '/su7/img/mesh/b8.webp',
        color: "#273647"
    },
    {
        src: '/su7/img/mesh/b9.webp',
        color: "#121117"
    },
    // b10,
    // b11
]
export const MeshColorNode = (callback = ()=>{})=>{
    let activeIndex = 0
    const ColorContainer = document.createElement("div");
    ColorContainer.className = 'Color-container'
    MeshColor.forEach((item,index)=> {
        const oDiv = document.createElement("div");
        oDiv.className = `${activeIndex === index ? 'color-item': ''}`
        oDiv.setAttribute('data-color',item.color)
        oDiv.style.cssText = `
                      background-image: url(${item.src});
                       width: 32px;
                       height: 32px;
                       border-radius: 50%;
                       margin: 8px;
                       background-size: 100% 100%;
                       cursor: pointer;`
        ColorContainer.appendChild(oDiv)
    })
    callback(MeshColor[0].color)
    document.body.appendChild(ColorContainer)

    delegate(ColorContainer, 'click', 'div', function(e){
       if (e.target.className !== 'Color-container'){
           clearClassName()
           e.target.classList.add('color-item')
           callback(e.target.dataset.color)
       }
    })
}

function clearClassName(){
    const colorContainer = document.querySelector('.Color-container')
    colorContainer.childNodes.forEach(item=>{
        item.classList.remove('color-item')
    })
}
function delegate(element,eventType,selector,fn){
    element.addEventListener(eventType, function (e){
        let el = e.target;
        while (el && !el.matches(selector)){
            if (element === el){
                el = null;
                break;
            }
            el = el.parentNode;
        }
        el && fn.call(el,e,el)
    });
    return element;
}

