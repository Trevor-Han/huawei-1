$(function () {
    const headerHeight = document.querySelector('.header')
    const windowWidth = window.innerWidth;
    const maxWidth = 750

    let mySwiper = new Swiper ('.banner .swiper-container',{
        autoplay: {
            delay: 3000,
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            bulletClass : 'my-bullet',//需设置.my-bullet样式
            bulletActiveClass: 'my-bullet-active',
        },

        on:{
            init: function(){
                swiperAnimateCache(this); //隐藏动画元素
                swiperAnimate(this); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function(){
                swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
                //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
                let offsetY = this.activeIndex * 45;
                // console.log(this.activeIndex);
                $(".swiper-name>span").animate({top: -offsetY}, 1000);
                $(".swiper-num>span").animate({top: -offsetY}, 1000);
            }
        }
    });
    mySwiper && mySwiper.autoplay.stop();

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

    const startPosition = {top: '50px', opacity: 0}
    const endPosition = {top: 0, opacity: 1}
    ScrollTrigger.create({
        trigger: '.phone-body .copy-write',
        start: 'top center',
        end: $('.copy-write').height(),
        scrub: true,
        onEnter(){
            gsap.to('.copy-write .theme h4',{...endPosition,duration: 0.4})
            gsap.to('.copy-write .theme h2',{...endPosition,duration: 0.6})
            gsap.to('.copy-write .text',{...endPosition,duration: 0.6})
        },
        onLeave(){
            gsap.to('.copy-write .theme h4',{...endPosition,duration: 0.4})
            gsap.to('.copy-write .theme h2',{...endPosition,duration: 0.6})
            gsap.to('.copy-write .text',{...endPosition,duration: 0.6})
        }
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

    // banner在视口时自动播放
    ScrollTrigger.create({
        trigger: '.banner',
        start: 'top bottom',
        scrub: true,
        onEnter() {
            mySwiper.autoplay.start();
        },
        onEnterBack(){
            mySwiper.autoplay.start();
        },
        onLeave() {
            mySwiper.autoplay.stop();
        }
    })

    if (windowWidth > maxWidth){
        ScrollTrigger.create({
            trigger: '.camera .camera_center',
            start: 'top center',
            end: '+=2000',
            pin: true,
            scrub: true,
            animation: gsap.timeline()
                .to('.pic_s5_pc',{ top:"48%",display:"none"})
                .to('.pic_s5_pc_allphone',{  width:"13%", top:"25%", opacity:0, display:"block"})
                .to('.pic_s6_pc_1',{ width:"13%", top:"25.8%", opacity:1, display:"block"},'<')
                .to('.pic_s6_pc_5',{ width:"12%", top:"22.5%", opacity:1},'<')
                .to('.pic_s6_pc_1',{ opacity:0})
                .to('.pic_s6_pc_3',{ left:"35%",opacity:0.8},'<')
                .to('.pic_s6_pc_4',{ left:"65%",opacity:0.8},'<')
                .to('.pic_s6_pc_5',{  width:"15%", borderRadius: "5%"})
        })

        ScrollTrigger.create({
            trigger: '.camera_2_con',
            start: 'top 100',
            end: '+=1000',
            pin: true,
            scrub: true,
            animation: gsap.timeline()
                .to('.camera_2_center',{ height:"100vh", width:"100%",top: '-100px'})
                .to('.camera_2_center img',{ borderRadius: "0px"},'<')
        })
    }




})
