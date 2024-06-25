$(function (){
    const headerHeight = document.querySelector('.header')

// 首屏固定并调低透明度
    ScrollTrigger.create({
        trigger: '.header',
        start: 'top top',
        end: headerHeight.offsetHeight, // 固定距离为当前元素高度
        pin:true, // 固定
        pinSpacing: false, // 不设置间距
        scrub: true,
        animation: gsap.timeline()
            .to('.header',{opacity: 0.5})
    })

    ScrollTrigger.create({
        trigger: '.phone-image',
        start: 'top top',
        end: '+=1500',
        pin: true,
        scrub: true,
        animation: gsap.timeline()
            .to('.phone_left',{ transform:"translateX(-150%)", opacity:0})
            .to('.phone_right',{ transform:"translateX(100%)", opacity:0},'<')
            .to('.phone_center',{ opacity:1},'-=0.5')
            .to('.phone_text',{ opacity:1})
    })

    ScrollTrigger.create({
        trigger: '.camera .pc_camera_center',
        start: 'top center',
        end: '+=2000',
        pin: true,
        scrub: true,
        animation: gsap.timeline()
            .to('.pic_s5_pc', {top: "48%", display: "none"})
            .to('.pic_s5_pc_allphone', {width: "13%", top: "25%", opacity: 0, display: "block"})
            .to('.pic_s6_pc_1', {width: "13%", top: "25.8%", opacity: 1, display: "block"}, '<')
            .to('.pic_s6_pc_5', {width: "12%", top: "22.5%", opacity: 1}, '<')
            .to('.pic_s6_pc_1', {opacity: 0})
            .to('.pic_s6_pc_3', {left: "35%", opacity: 0.8}, '<')
            .to('.pic_s6_pc_4', {left: "65%", opacity: 0.8}, '<')
            .to('.pic_s6_pc_5', {width: "15%", borderRadius: "5%"})
    })


    ScrollTrigger.matchMedia({
        "(min-width: 1025px)":function (){
            let t1 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.camera_2_con',
                    start: 'top 100',
                    end: '+=1000',
                    pin: true,
                    scrub: true,
                }
            })
            t1.to('.camera_2_con .camera_2_center',{ height:"100vh", width:"100%",top: '-100px'})
                .to('.camera_2_con .camera_2_center img',{ borderRadius: "0px"},'<')
        }
    })

    ScrollTrigger.create({
        trigger: '.chip',
        start: 'top top',
        end: '+=3000',
        pin: true,
        scrub: true,
        onUpdate(self){
            const $h1 = document.querySelector('#chip-con h1');
            const $picture = document.querySelector('.chip #picture-iPhone-15-pro');
            const $theChip = document.querySelector('#the-chip');
            const $chipSvg = document.querySelector('#chip-svg');
            const $maskChip = document.querySelector('#mask-bg');
            const progress = self.progress
            const section = progress * 10 / 9

            $theChip.style.width = $theChip.style.height =
                    document.documentElement.clientWidth * 20 * (section * section * section) + 'px';

            if (section <= 0.1) {
                $h1.style.opacity = (0.1 - section) / 0.1;
                $h1.style.marginTop = section * 1000 * -1 + 'px';

                $picture.style.opacity = (0.1 - section) / 0.1;
                $picture.style.marginTop = section * 1000 + 'px';

            } else {
                $h1.style.opacity = 0
                $picture.style.opacity = 0
            }

            if (section <= 0.2) {
                $chipSvg.style.opacity = (section - 0.1) / 0.1;
            }else {
                $chipSvg.style.opacity = 1
            }

            if (section >= 0.5) {
                $maskChip.style.opacity = (1 - section) / 0.5;
                $theChip.classList.add('transparent');
            } else {
                $maskChip.style.opacity = 1;
                $theChip.classList.remove('transparent');
            }

            if (section >= 0.9) {
                $theChip.style.opacity = (0.9 - section) / 0.05;
            } else {
                $theChip.style.opacity = 1
            }
        }
    })
    // const config = { attributes: true, childList: true, subtree: true };
    // const targetNode = document.querySelector('.DJI_whole')
    // const observer = new MutationObserver((mutations) => {
    //     mutations.forEach((mutation) => {
    //         console.log(mutation);
    //     });
    // });
    // observer.observe(targetNode, config);


    sectionDJIWhole();
    sectionDJI();
    function sectionDJIWhole(){
        ScrollTrigger.matchMedia({
            "(min-width: 1025px)":function (){
                let t1 = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.DJI_whole',
                        start: 'top top',
                        end: '+=2000',
                        pin: true,
                        scrub: true,
                    }
                })
                t1.to('.style__whole_text .whole_text__feature',{opacity:1,top: '20%'})
                    .to('.style__whole_text .whole_text__service',{opacity:1,top: '20%',delay: 0.3})
                    .to('.style__whole_text .whole_text__feature',{opacity:0},'-=0.7')
            }
        })
    }
    function sectionDJI(){
        const images = [];

        for(let i = 0; i< 64; i++){
            let image = new Image();
            image.src = `./img/DJI/${i+1}.jpg`
            images[i] = image
        }
        $('.DJI_img').append(images[0])

        const changeFrame = (el,progress,start,end)=>{
            const showBox = (progress - start) / (end - start)
            $(el).css({
                'opacity': progress < end ? showBox : 0,
            })

            const lineEnd = end - 0.05
            const progressWidth_1 = 34/((lineEnd - progress)*100)
            const maxWidth_1 = lineEnd - progress <= 0 ? 34 : progressWidth_1
            $(el).find(' .style__line___1h1bo').css({
                'width': `${maxWidth_1}rem`,
            })

            const transform =  (8.75 - 0.75) / Math.abs(showBox * 7)
            $(el).find(' .style__line-text-desc___10dbc').css({
                'transform': `translateY(${transform}px) translateZ(0px)`,
            })
        }

        ScrollTrigger.create({
            trigger: '.DJI',
            start: 'top top',
            end: '+=2500',
            pin: true,
            scrub: true,
            onUpdate(self){
                const progress = self.progress
                let index = Math.ceil(progress * 64);
                index  <= 63 && $('.DJI_img').empty();
                $('.DJI_img').append(images[index])

                $('.DJI .pc_text .center_text').css({
                    'opacity': (0.11 - progress) / 0.11,
                    'fontSize': `${8 + progress * 20}rem`
                })

                const showText = (progress - 0.14) / (0.30 - 0.14)
                const hideText = (0.46 - progress) / (0.46 - 0.3)
                $('.style__desc-text___1yKdX').css({
                    'opacity': progress < 0.30 ? showText : hideText,
                })

                changeFrame( $('.style__line-text-box .box_1'),progress,0.51,0.70)
                changeFrame( $('.style__line-text-box .box_2'),progress,0.70,0.83)
                changeFrame( $('.style__line-text-box .box_3'),progress,0.83,1)

            }
        })
    }


})
