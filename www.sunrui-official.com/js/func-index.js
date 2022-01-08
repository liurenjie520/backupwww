// JavaScript Document




//视差滚动特效
$(document).ready(function(){
	$(".news").parallax("0", 0.05);
	$(".resume-bg").parallax("0", -0.05);
	$(".resume").parallax("0", -0.05);
	
	//音乐作品swiper
	new Swiper('.works .music', {
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		
		breakpoints: {
			750: {
				slidesPerView: 5,
				slidesOffsetBefore: 120,
				slidesOffsetAfter: 120,
				spaceBetween: 40,
			},
		},

		navigation: {
			prevEl: '.works .music .btn-navigation-left',
			nextEl: '.works .music .btn-navigation-right',
		},
	});
	
	//影视作品swiper
	new Swiper('.works .movie', {
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		
		breakpoints: {
			750: {
				slidesPerView: 6,
				slidesOffsetBefore: 120,
				slidesOffsetAfter: 120,
				spaceBetween: 40,
			},
		},

		navigation: {
			prevEl: '.works .movie .btn-navigation-left',
			nextEl: '.works .movie .btn-navigation-right',
		},
	});
	
	//综艺swiper
	new Swiper('.works .show', {
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		
		breakpoints: {
			750: {
				slidesPerView: 6,
				slidesOffsetBefore: 120,
				slidesOffsetAfter: 120,
				spaceBetween: 40,
			},
		},

		navigation: {
			prevEl: '.works .show .btn-navigation-left',
			nextEl: '.works .show .btn-navigation-right',
		},
	});

	//主要作品切换
	$('.works .tab a').on('click', function(event){
		var seled = $(event.target).text();

		$('.works .movie').css('display', 'none');
		$('.works .music').css('display', 'none');
		$('.works .show').css('display', 'none');
		$('.works .tab li').removeClass();
		$(event.target).parents('li').addClass('seled');

		switch(seled){
			case '影视':
				$('.works .movie').css('display', 'block');
				break;
			case '音乐':
				$('.works .music').css('display', 'block');
				break;
			case '综艺':
				$('.works .show').css('display', 'block');
				break;
			default:
				break;
		}
	});
	
	//个人荣耀swiper
	new Swiper('.glory .history', {
		freeMode: true,
		slidesPerView: 1,
		slidesOffsetBefore: 60,
		slidesOffsetAfter: 60,
		observer: true,
		observeParents: true,
		
		breakpoints: {
			750: {
				slidesPerView: 2,
			},
		},

		navigation: {
			prevEl: '.glory .btn-navigation-left',
			nextEl: '.glory .btn-navigation-right',
		},
	});
});


//设置内容块的marign-top为窗口高度
function setContainer(){
	var wh = $(window).height();
	var fh = $("footer").height()+260;//补正footer的margin、padding
	$(".container").css("top", wh);
	$(".contact").css("height", wh);
}
$(window).resize(function(){
	setContainer();
});
setContainer();


//窗口滚动至内容框，设置nav、header、footer样式
$(window).scroll(function(){
	var ht = $("header").height()-125;//取header高度，补正nav-fixed的高度
	var wt = $(window).scrollTop();//滚动距离
	if(wt >= ht){
		$("header").css("display","none");
		$("footer").css("display","block");
		$("nav").addClass("nav-fixed");
		$(".gotop").css("display","block");
	}else{
		$("header").css("display","block");
		$("footer").css("display","none");
		$("nav").removeClass("nav-fixed");
		$(".gotop").css("display","none");
	}
});


//页面滚动
function pageRoll(target){
	$("html,body").animate({scrollTop:target},500);
}


//滚动到内容块位置
function goRead(){
	var ct = $(".container").offset().top;
	pageRoll(ct);
}


//滚动到页面顶部
function goTop(){
	pageRoll(0);
}


//获取URL的锚点，并滚动到指定位置
function getUrlAnchor(){
	var idn = window.location.hash;
	switch(idn){
		case "#news":
			goNavSeled(1,true);
			break;
		case "#resume":
			goNavSeled(2,true);
			break;
		case "#music":
			goNavSeled(3,true);
			break;
		case "#movie":
			goNavSeled(4,true);
			break;
		case "#gallery":
			goNavSeled(5,true);
			break;
		case "#contact":
			goNavSeled(6,true);
			break;
	}
}
getUrlAnchor()


//nav,点击滚动及选中特效
function goNavSeled(i,n){
	var navSeled = i;
	var ifPatch = n;
	var heightPatch = 0;

	//启用header高度补正
	if(ifPatch){
		heightPatch = -50;//首页根据#锚点定位进行补正
	}else{
		heightPatch = 125;//nav-fixed高度影响
	}

	var wt1 = $(".news h2").offset().top - heightPatch;;
	var wt2 = $(".resume h2").offset().top - heightPatch;
	var wt3 = $(".works h2").offset().top - heightPatch;
	var wt4 = $(".gallery h2").offset().top - heightPatch;
	var wt5 = $(".glory h2").offset().top - heightPatch;
	var wt6 = $(document).height();

	function seledTarget(){
		var target = navSeled - 1;
		pageRoll(eval("wt" + navSeled));
		$("nav .seled").css({
			"left":$("nav li:eq(" + target + ")").offset().left,
			"width":$("nav li:eq(" + target + ")").width()
		});
		//关闭菜单
		closeMenu()
	}

	seledTarget();
}


//打开菜单
function openMenu(){
	$("nav").removeClass("menu-layer-close");
	$("nav").addClass("menu-layer-open");
	$("body").addClass("stop-roll");			
}


//关闭菜单
function closeMenu(){
	$("nav").removeClass("menu-layer-open");
	$("nav").addClass("menu-layer-close");
	$("body").removeClass("stop-roll");
}


//菜单切换功能
function menuFunc(){
	if($("nav").hasClass("menu-layer-open")){
		closeMenu();
	}else{
		openMenu();
	}
}