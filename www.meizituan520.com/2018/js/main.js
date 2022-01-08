var Common = function(){

    var _scaleCount = 1

    var _winResize = function(){
        var _reSize = function(){
            var _winWidth = $(window).width(),
                _winHeight = $(window).height()

            /*if(_winWidth<1920 || _winHeight < 970){
                if(_winWidth/_winHeight >= 1920/970){
                    _scaleCount = _winHeight/970
                }
                else{
                    _scaleCount = _winWidth/1920
                }

                $("#main").css({"width":1920*_scaleCount,"height":$("#wrap").height()*_scaleCount})
                $("#wrap").css({"transform":"scale("+_scaleCount+")"})
            }*/
            if(_winHeight < 950){
                _scaleCount = _winHeight/950

                if(_winWidth/_winHeight > 1920/950){
                    _winWidth = 1920*_scaleCount
                }
                else if(_winWidth/_winHeight < 1200/950){
                    _winWidth = 1200*_scaleCount
                }

                $("#main").css({"width":_winWidth,"min-width":"auto","height":$("#wrap").height()*_scaleCount})
                $("#wrap").css({"width":_winWidth/_scaleCount,"transform":"scale("+_scaleCount+")","min-width":"auto","max-width":"auto"})
                $(".pop").css({"transform":"scale("+_scaleCount+")"})
            }
            else{
                _scaleCount = 1;
                $("#main").css({"width":"auto","min-width":"1200px","height":"auto"})
                $("#wrap").css({"width":"auto","transform":"none","min-width":1200,"max-width":1920})
                $(".pop").css({"transform":"scale(1)"})

            }

        }
        _reSize();
        $(window).resize(function(){
            _reSize();
        });


    }

    var _contentActive = function(){
        var _aCtive = function(){
            var _bodyTop = $(window).scrollTop() + $(window).height()*4/5;
            $(".content").each(function(i){
                var _this = $(this)
                if(_this.offset().top <= _bodyTop && !/content-active/.test(_this.attr("class"))){
                    _this.addClass("content-active")
                }
            })
        }
        _aCtive()
        $(window).resize(function(){
            _aCtive();
        });
        $(window).scroll(function(){
            _aCtive();
        });
    }

    var _indexHash = function(){
        if(window.location.hash !=""){
            var _hash = window.location.hash.replace("-go",""),
                _top = $(_hash).offset().top
            $("html,body").animate({"scrollTop":_top})
        }
        $("nav a").on("click",function(){
            if(/\/#/.test($(this).attr("href"))){
                var _hash = $(this).attr("href").replace(/\/|-go/g,""),
                    _top = $(_hash).offset().top
                $("html,body").animate({"scrollTop":_top})

            }
        })

    }

    var _bannerSwiper = function(){
        var mySwiper = new Swiper('#swiper-banner', {
            direction: 'horizontal',
            loop: true,
            autoplay:5000,

            // 如果需要分页器
            pagination: '#swiper-banner-pagination',
            paginationClickable :true
        })

        $('#swiper-banner-prev').on('click', function(e){
            e.preventDefault()
            mySwiper.swipePrev()
        })
        $('#swiper-banner-next').on('click', function(e){
            e.preventDefault()
            mySwiper.swipeNext()
        })
    }

    var _memberSwiper = function(){
        var _mySwiper = new Swiper('#swiper-member', {
            direction: 'horizontal',
            loop: true
            //lazyLoading : true,

            // 如果需要分页器
            /*pagination:  '#swiper-member-pagination',
            paginationClickable :true,
            paginationBulletRender: function (index, className) {
                return '<li class="' + className + '">' + $("#swiper-member-pagination li").eq(index).html() + '</li>';
            }*/
        })

        $("#swiper-member-pagination li").eq(0).addClass("swiper-pagination-bullet-active")
        $("#swiper-member-pagination li").on('touchstart mousedown',function(e){
            e.preventDefault()
            $("#swiper-member-pagination .swiper-pagination-bullet-active").removeClass('swiper-pagination-bullet-active')
            $(this).addClass('swiper-pagination-bullet-active')
            _mySwiper.swipeTo( $(this).index() )
        })
    }

    var _worksSwiper = function(){
        var _$worksnavli = $("#swiper-works-pagination li"),
            _$swiper = $("#swiper-works"),
            _$wrapper = $("#swiper-works > .swiper-wrapper"),
            _$slide =  $("#swiper-works > .swiper-wrapper > .swiper-slide"),
            _swiperWidth =_$swiper.width()

        /*var _mySwiper = new Swiper('#swiper-works', {
            direction: 'horizontal',
            loop: true,


        })

        $("#swiper-works-pagination li").eq(0).addClass("swiper-pagination-bullet-active")
        $("#swiper-works-pagination li").on('touchstart mousedown',function(e){
            e.preventDefault()
            $("#swiper-works-pagination .swiper-pagination-bullet-active").removeClass('swiper-pagination-bullet-active')
            $(this).addClass('swiper-pagination-bullet-active')
            _mySwiper.swipeTo( $(this).index())
        })*/


        _$wrapper.css({"position":"absolute","width":_swiperWidth*3+10})
        _$slide.css({"float":"left","width":_swiperWidth})
        _$worksnavli.each(function(i){
            $(this).click(function(){

                _$worksnavli.removeClass("swiper-pagination-bullet-active")
                _$worksnavli.eq(i).addClass("swiper-pagination-bullet-active")
                _$wrapper.stop().animate({"left":-_swiperWidth*i})
            })
        })
        _$worksnavli.eq(0).click()
    }

    var _worksSwipers = function(swiper,page,prev,next){
        var _$swiper = $(swiper),
            _swiperliLen = _$swiper.find("li").length,
            _page = 0,
            _htmls = []
        if(_swiperliLen > 2){
            for(var i = 0;i < _swiperliLen;i++){
                _$swiper.find("li").eq(i).find("a").attr({"num":i})
                _htmls.push(_$swiper.find("li").eq(i).html())
                if(i == _swiperliLen-1 && i%2 == 0){
                    _htmls[i] = '<div class="swiper-slide"><ul class="works-list"><li>'+ _htmls[i] +'</li></ul></div>'
                }
                else if(i%2 == 0){
                    _htmls[i] = '<div class="swiper-slide"><ul class="works-list"><li>'+ _htmls[i] +'</li>'
                }
                else if(i%2 == 1){
                    _htmls[i] = '<li>'+ _htmls[i] +'</li></ul></div>'
                }
            }
            _$swiper.find(".swiper-wrapper").html(_htmls.join(""))

            $(prev).show();
            $(next).show();

            var mySwiper = new Swiper(swiper, {
                direction: 'horizontal',
                loop: true,


                // 如果需要分页器
                pagination:  page,
                paginationClickable :true
            })


            $(prev).on('click', function(e){
                console.log(1)
                e.preventDefault()
                mySwiper.swipePrev()
                console.log(1)
            })
            $(next).on('click', function(e){
                e.preventDefault()
                mySwiper.swipeNext()
            })
        }
    }

    var _videoShow = function(list){
        $(list).find("a").on("click",
            function(){
                var _url = $(this).attr("href")
                _popvideoOpen("#pop-video",_url)
                return false;
            }
        )

    }

    var _picShow = function(list){
        $(list+" a").on("click",
            function(){
                var _url = $(this).attr("href")
                _poppicOpen("#pop-pic",_url)
                return false;
            }
        )
    }

    var _clickpopClose = function(){
        var _$popBg = $("#pop-bg")
        _$popBg.click(function(){
            _popClose();
        })

        $(".pop-close").click(function(){
            _popClose();
        })
    }

    var _popOpen = function(obj){
        var _$pop = $(obj),
            _$popBg = $("#pop-bg")
        _$pop.addClass("pop-show")
        _$popBg.show();
    }
    var _popClose = function(){
        $("#video-player").html("")
        $(".pop").removeClass("pop-show");
        $("#pop-bg").hide();
    }

    var _popvideoOpen = function(obj,url){
        var _$pop = $(obj),
            _$popBg = $("#pop-bg");
        _$pop.find("div").html("<iframe src='"+url+"' frameborder=0 'allowfullscreen'></iframe>");
        _$pop.addClass("pop-show");
        _$popBg.show();
    }

    var _poppicOpen = function(obj,_url){
        var _$pop = $(obj),
            _$popBg = $("#pop-bg"),
            _$slide = _$pop.find("div"),
            _img = new Image()
        _img.src = _url;
        var _setSize = function(obj){
            if(obj.width < _$slide.width() && obj.height < _$slide.height()){

            }
            else if(obj.width >= obj.height){
                _$slide.css({"background-size":"100% auto"})
            }
            else if(obj.width < obj.height){
                _$slide.css({"background-size":"auto 100%"})
            }
            _$slide.css({"background-image":"url("+_url+")"})

        }
        if(_img.complete){
            _setSize(_img);
        }

        _img.onload=function(){
            _setSize(_img);
        }

        _$pop.addClass("pop-show");
        _$popBg.show();
    }

    /*加载列表*/
    var _loadList = function(list,callback){
        var _$loadlist = $(list),
            _$loadmore = $("#load-more"),
            _loading = false,
            _setInterval;
        var _checkPages = function(){
            if($("#load-pages li").length ==2 ){
                _$loadmore.css({"display":"block"});
                _setInterval = setInterval(function(){
                    if($(window).height() + $(window).scrollTop() > _$loadmore.offset().top + _$loadmore.height() && _loading== false){
                        _loading = true;
                        if($("#loadList").length<1){
                            $("body").append("<iframe id='loadList' style='display:none'></iframe>");
                        }
                        $("#loadList").attr("src",$("#load-pages a").eq(0).attr("href"))
                        setTimeout(function(){
                            $("#loadList").on("load",function(){
                                var _html = $("#loadList").contents();
                                _$loadlist.append(_html.find(list).html());
                                $("#load-pages").html(_html.find("#load-pages").html());
                                $("#main").css({"height":$("#wrap").height()*_scaleCount})
                                if(callback){
                                    callback();
                                }
                                _loading = false
                                _checkPages()
                            })

                        },0)
                    }
                },100)
            }
            else{
                clearInterval(_setInterval)
                _$loadmore.css({"display":"none"});
            }
        }
        _checkPages()

    }


    _nyMove =function(){
        var _offsetTop = $("#content-ny-box").offset().top,
            _$move = $("#ny-move")
        var _move = function(){

            if($(window).scrollTop() >_offsetTop){
                _$move.stop().animate({"top":($(window).scrollTop() - _offsetTop)/_scaleCount},1000);
            }
            else{
                _$move.stop().animate({"top":0},1000);
            }
        }

        $(window).resize(function(){
            _move();
        });
        $(window).scroll(function(){
            _move();
        });
    }

    var _goTop = function(){
        $("#gotop").click(function(){
            $("html,body").stop().animate({scrollTop:0},300);
        })
    }


    var _index = function(){
        _winResize();
        setTimeout(function(){

            _indexHash();
        },0)
        _contentActive();
        _bannerSwiper();
        _memberSwiper();
        _worksSwipers("#swiper-mv","#swiper-mv-pagination","#swiper-mv-prev","#swiper-mv-next");
        _worksSwipers("#swiper-ng","#swiper-ng-pagination","#swiper-ng-prev","#swiper-ng-next");
        _worksSwipers("#swiper-pics","#swiper-pics-pagination","#swiper-pics-prev","#swiper-pics-next");
        _worksSwiper();
        _videoShow("#swiper-mv");
        _videoShow("#swiper-ng");
        _picShow("#swiper-pics");
        _clickpopClose();
        _goTop();
    }
    var _newslist = function(){
        _winResize();
        _contentActive();
        _loadList("#newslist");
        _nyMove();
        _goTop();
    }
    var _article = function(){
        _winResize();
        _contentActive();
        _nyMove();
        _goTop();
    }

    var _init = $("body").attr("name");
    if(_init == "index"){
        _index()
    }
    else if(_init == "newslist"){
        _newslist()
    }
    else if(_init == "article"){
        _article()
    }

    //返回外部接口，目前提供init
    return {
        init : _index
    };
}()