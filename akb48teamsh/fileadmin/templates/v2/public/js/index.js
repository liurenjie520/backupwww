var mySwiper = new Swiper('.banner-swiper', {
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev',
	  
	},
	pagination: {
	el: '.swiper-pagination',
	},   
});
$('#mymember').carousel({
	interval:3000,
	wrap:true,
	pause:'hover'

});
