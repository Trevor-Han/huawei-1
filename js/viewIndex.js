$(function () {
    let mySwiper = new Swiper ('.swiper-container',{
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
    mySwiper.autoplay.stop();

    // 首屏固定并调低透明度
    const headerHeight = document.querySelector('.header')
    const easing = [0.645, 0.045, 0.355, 1]
    ScrollTrigger.create({
        trigger: '.header',
        start: '10 top',
        end: headerHeight.offsetHeight, // 固定距离为当前元素高度
        pin:true, // 固定
        pinSpacing: false, // 不设置间距
        scrub: true,
        animation: gsap.timeline()
                .to('.header',{opacity: 0.5})
            // .fromTo('.copy-write .text',{top: '50px',duration:100,easing:easing},{top: 0},'>')
            // .fromTo('.copy-write .theme h4',{top: '50px',duration:100,easing:easing},{top: 0},'>')
            // .fromTo('.copy-write .theme h2',{top: '50px',duration:100,easing:easing},{top: 0}, '>')
    })



})
