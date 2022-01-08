//滚动事件
$(window).scroll(function(){
	var ht = $('header').height();
	var wt = $(window).scrollTop();
	var wh = $(window).height();
	
	//header浮动
	if(wt > 0){
		$('header').addClass('fixed');
		$('.page').css('margin-top', ht);
	}else{
		$('header').removeClass('fixed');
		$('.page').css('margin-top', '0');
	}
	
	//go2top浮动
	if(wt > wh){
		$('.go2top').addClass('fixed');
	}else{
		$('.go2top').removeClass('fixed');
	}
});

//go2top事件
function go2Top(){
	pageRoll(0);
}

//滚动定位
function pageRoll(target){
	$('html, body').animate({scrollTop: target}, 500);
}

//导航跳转
$('nav a').on('click', function(){
	var href = $(this).attr('href');
	var i = href.indexOf('#');
	var hash = href.slice(i);
	var target = $(hash).offset().top - $('header').height() * 2;
	
	//首页
	if($('#index').html()){
		pageRoll(target);
		return false;
	}
});

//移动端菜单
$('.menu').toggle(
	function(){
		$(this).addClass('open');
		$('nav').addClass('open');
		$('html, body').addClass('fixed');
	},
	function(){
		$(this).removeClass('open');
		$('nav').removeClass('open');
		$('html, body').removeClass('fixed');
	}
);

//首页事件
function indexInit(){
	//个人荣耀swiper
	new Swiper('#glory .history', {
		freeMode: true,
		slidesPerView: 2,
		mousewheel: true,
		observer: true,
		observeParents: true,

		navigation: {
			prevEl: '#glory .btn-navigation-left',
			nextEl: '#glory .btn-navigation-right',
		},

		breakpoints: {
			1024: {
				slidesPerView: 1,
			},
		},
	});

	//影视作品swiper
	new Swiper('#works .movie', {
		loop: true,
		slidesPerView: 3,
		spaceBetween: 40,
		observer: true,
		observeParents: true,

		navigation: {
			prevEl: '#works .movie .btn-navigation-left',
			nextEl: '#works .movie .btn-navigation-right',
		},

		breakpoints: {
			1024: {
				slidesPerView: 2,
				spaceBetween: 20,
			},

			425: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
		},
	});

	//音乐作品swiper
	new Swiper('#works .music', {
		loop: true,
		slidesPerView: 4,
		spaceBetween: 40,
		observer: true,
		observeParents: true,

		navigation: {
			prevEl: '#works .music .btn-navigation-left',
			nextEl: '#works .music .btn-navigation-right',
		},

		breakpoints: {
			1024: {
				slidesPerView: 3,
				spaceBetween: 20,
			},

			425: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
		},
	});
	
	//综艺swiper
	new Swiper('#works .show', {
		loop: true,
		slidesPerView: 5,
		spaceBetween: 40,
		observer: true,
		observeParents: true,

		navigation: {
			prevEl: '#works .show .btn-navigation-left',
			nextEl: '#works .show .btn-navigation-right',
		},

		breakpoints: {
			1024: {
				slidesPerView: 3,
				spaceBetween: 20,
			},

			425: {
				slidesPerView: 2,
				spaceBetween: 0,
			},
		},
	});

	//主要作品切换
	$('#works .tab a').on('click', function(event){
		var seled = $(event.target).text();

		$('#works .movie').css('display', 'none');
		$('#works .music').css('display', 'none');
		$('#works .show').css('display', 'none');
		$('#works .tab li').removeClass();
		$(event.target).parents('li').addClass('seled');

		switch(seled){
			case '影视':
				$('#works .movie').css('display', 'block');
				break;
			case '音乐':
				$('#works .music').css('display', 'block');
				break;
			case '综艺':
				$('#works .show').css('display', 'block');
				break;
			default:
				break;
		}
	});
	
	//精彩瞬间大图
	$('#gallery ul a').on('click', function(){
		var url = $(this).attr("href");
		
		layer.open({
			type: 1,
			content: '<img src=' + url + ' alt="大图">',
			className: 'layer-gallery',
		});
		
		return false;
	});
}









