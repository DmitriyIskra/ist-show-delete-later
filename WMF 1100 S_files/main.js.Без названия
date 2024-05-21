
//navbarsMenu
function navbarmenu(){
		$('.btn-menu').on('click', function () {
      $(this).toggleClass('close');
      $('.navbar-main').toggleClass('show'); 
      $('body').toggleClass('menu-opened');
		});
	}
	navbarmenu();
	$(document).on('click', function (event) {
		if (!$(event.target).closest('.navbar-main, .btn-menu').length) {
			$('.navbar-main').removeClass('show');
			$('.btn-menu').removeClass('close'); 
      $('body').removeClass('menu-opened');      
		}
	});

//search
function search_bar(){
		$('.search-trigger').on('click', function () {
      $(this).toggleClass('close');
      $('body').toggleClass('drop-opened');
			const search = $('.search');
			if (search.is('.search-opened')) {
				search.removeClass('search-opened');
			} else {
				search.addClass('search-opened');
				$('.search-input')[0].focus();
			}
		});
	}
	search_bar();
	$(document).on('click', function (event) {
		if (!$(event.target).closest('.search, .search-trigger').length) {
			$('.search').removeClass('search-opened');
			$('.search-trigger').removeClass('close'); 
      $('body').removeClass('drop-opened');      
		}
	});

//sidebar
	function sidebar(){
      $('.main-sidebar').click(function () {
        $(this).toggleClass('click');
      $('.sidebar-background').toggleClass('show');        
        $('.main-sidebar-body').toggleClass('show');        
      });
	}
	sidebar();
	$(document).on('click', function (event) {
		if (!$(event.target).closest('.main-sidebar-body, .main-sidebar').length) {
			$('.main-sidebar-body').removeClass('show');
			$('.main-sidebar').removeClass('click'); 
      $('.sidebar-background').removeClass('show');      
		}
	});

$(document).ready(function () { 
var swiperOptions = {
loop: true,
speed: 1000,
autoplay: {
delay: 4000,
},
pagination: {
el: '.swiper-pagination',
clickable: true,
},
navigation: {
nextEl: '.swiper-button-next',
prevEl: '.swiper-button-prev',
},
};
if($('div').hasClass('ist-swipre-slider')){     
var swiper = new Swiper(".ist-swipre-slider", swiperOptions); 
}     
var sliderBgSetting = $(".slide-bg-image");
sliderBgSetting.each(function(indx){
if ($(this).attr("data-background")){
$(this).css("background-image", "url(" + $(this).data("background") + ")");
}
});
}); 

//Carousel Gallery Swiper
 
  if($('div').hasClass('ist-swiper-gallery')){
    var swiper = new Swiper('.ist-swiper-gallery', {
          effect: 'slide',
          speed: 2500,
          slidesPerView: 7,
          spaceBetween: 10,
          simulateTouch: true,
          autoplay: {
          delay: 500,
          stopOnLastSlide: false,
          disableOnInteraction: false
      },
      breakpoints: {
        320: {
          slidesPerView: 3,
          spaceBetween: 5
        },
        425: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 7,
          spaceBetween: 20
        }
      }  
    }); 
}

  

//Menu close
//$(document).ready(function(){
//$('.navbar-toggler-icon').click(function () {
//	$(this).toggleClass('close');
//	});
//});

//matchHeight
(function () {
  $(function () {
    $(".catalog-wrap .title").matchHeight();
    $(".catalog-wrap .text-desc").matchHeight();
    
  });
})();



//back to top
  var btn = $('#to-top');
$(window).scroll(function() {
  if ($(window).scrollTop() > 1000) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});
btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});