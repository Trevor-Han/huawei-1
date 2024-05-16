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

    let controller = new ScrollMagic.Controller();
    let sense = new ScrollMagic.Scene({
        triggerElement:".top_1",
        triggerHook:"onLeave",
        duration: "120%"
    }) ;
    sense.setPin(".top",{pushFollowers:false});
    sense.setTween(".top",1,{opacity:0.5});
    controller.addScene(sense);

    let sense1 = new ScrollMagic.Scene({
        triggerElement:".middle_1",
        triggerHook:"onEnter",
    });
    sense1.setVelocity([".middle_con>div",".middle_con>div>p"],{
        top:"0px",
        opacity:"1"
    },{
        duration:800,
        easing:[0.645, 0.045, 0.355, 1]
    });
    controller.addScene(sense1);

    let sense2 = new ScrollMagic.Scene({
        triggerElement:".middle_1",
        triggerHook:"onLeave",
        offset:$(".middle_con").height()+100,
        duration: "100%"
    });
    sense2.setPin(".middle",{pushFollowers:false});
    let tt = new TimelineMax();
    tt.add([
        new TweenMax(".con_left",1,{
            transform:"translateX(-150%)",
            opacity:0
        }),
        new TweenMax(".con_right",1,{
            transform:"translateX(100%)",
            opacity:0
        }),
        new TweenMax(".con_text",1,{
            opacity:1,
            delay: 0.4
        }),
    ]);
    tt.add(new TweenMax(".con_center",1,{
        opacity:1
    }));
    sense2.setTween(tt);
    controller.addScene(sense2);

    let sense3 = new ScrollMagic.Scene({
        triggerElement:".big_1",
        triggerHook:"onEnter",
    });
    sense3.setVelocity([".middle_con>div",".middle_con>div>p"],{
        top:"0px",
        opacity:"1"
    },{
        duration:800,
        easing:[0.645, 0.045, 0.355, 1]
    });
    controller.addScene(sense3);

    let sense5 = new ScrollMagic.Scene({
        triggerElement:".big_1",
        triggerHook:"onLeave",
        duration: "100%"
    });
    sense5.setPin(".big",{pushFollowers:false});
    let bt = new TimelineMax();
    bt.add([
        new TweenMax(".pic_s5_pc",1,{
            top:"48%",
            display:"none"
        }),
        new TweenMax(".pic_s5_pc_allphone",1,{
            width:"13%",
            top:"25%",
            opacity:0,
            delay: 1,
            display:"block"
        }),
        new TweenMax(".pic_s6_pc_1",1,{
            width:"13%",
            top:"25.8%",
            opacity:1,
            delay: 1,
            display:"block"
        }),
        new TweenMax(".pic_s6_pc_5",1,{
            width:"12%",
            top:"22.5%",
            opacity:1,
            delay: 1.4,
        })
    ]);
    bt.add(new TweenMax(".pic_s6_pc_1",1,{
        opacity:0,
    }));
    bt.add([new TweenMax(".pic_s6_pc_3",1,{
        left:"35%",
        opacity:0.8
    }),
        new TweenMax(".pic_s6_pc_4",1,{
            left:"65%",
            opacity:0.8
        }),
        new TweenMax(".pic_s6_pc_5",1,{
            width:"15%",
            borderRadius: "5%",
            delay: 1.4,
        })
    ]);
    sense5.setTween(bt);
    controller.addScene(sense5);

    let section = new ScrollMagic.Scene({
        triggerElement:".section_1",
        triggerHook:"onEnter",
    });
    section.setVelocity([".middle_con>div",".middle_con>div>p"],{
        top:"0px",
        opacity:"1"
    },{
        duration:800,
        easing:[0.645, 0.045, 0.355, 1]
    });
    controller.addScene(section);

    let section2 = new ScrollMagic.Scene({
        triggerElement:".section_2",
        triggerHook:"onEnter",
    });
    section2.setVelocity([".middle_con>div",".middle_con>div>p"],{
        top:"0px",
        opacity:"1"
    },{
        duration:800,
        easing:[0.645, 0.045, 0.355, 1]
    });
    controller.addScene(section2);

    let section3 = new ScrollMagic.Scene({
        triggerElement:".section_2",
        triggerHook:"onLeave",
        duration: "78%"
    });
    section3.setPin(".section2",{pushFollowers:false});
    let at = new TimelineMax();
    at.add([
        new TweenMax(".section_content2",1,{
            opacity:0.2
        }),
        new TweenMax(".img_container",1,{
            borderRadius: "0px",
            top:"0%",
            backgroundSize:"100%",
            height:"100vh",
            width:"100%",
        }),
    ]);
    section3.setTween(at);
    controller.addScene(section3);

    $(window).scroll(function () {
        let valueOpacity = $(".section_content2").css("opacity");
        console.log(valueOpacity);
        if (valueOpacity < 0.3) {
            $(".section_content2").attr("style","visibility:hidden");
        }else {
            $(".section_content2").attr("style","visibility:visible");
        }
    });
    // 2.创建一个场景对象
    let scene4 = new ScrollMagic.Scene({
        triggerElement:".section_bottom",
        triggerHook: "onCenter",
    });
    scene4.on("start", function (event) {
        // console.log("进入场景");
        // mySwiper.autoplay.start();
        if(event.scrollDirection === "FORWARD"){
            // console.log("向下滚动");
            mySwiper.autoplay.start();
        }else{
            // console.log("向上滚动");
            mySwiper.autoplay.stop();
        }
    });
    // 3.将场景对象添加到控制器对象中
    controller.addScene(scene4);

});
