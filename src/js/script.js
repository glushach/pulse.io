const slider = tns({
  container: '.carousel__inner',
  preventScrollOnTouch: 'auto',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  responsive: {
    767: {
      nav: true
    },
    320: {
      nav: true
    }
  }
});
document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});

$(document).ready(function(){
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  // $('.catalog-item__link').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   });
  // });
  // $('.catalog-item__back').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   });
  // });
  function toggleClider(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }
  toggleClider('.catalog-item__link');
  toggleClider('.catalog-item__back');

  // Модальные окна
  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  // $('.button_mini').on('click', function() {
  //   $('.overlay, #order').fadeIn('slow');
  // });

  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

 //Валидация форм вместо requared
  // function validateForms(form) {
  //   $(form).validate({
  //     rules: {
  //       name: {
  //         required: true,
  //         minlength: 2
  //       },
  //       phone: "required",
  //       email: {
  //         required: true,
  //         email: true
  //       }
  //     },
  //     messages: {
  //       name: {
  //         required: "Пожалуйста, введите свое имя",
  //         minlength: jQuery.validator.format("Введите {0} символа!")
  //       },
  //       phone: "Пожалуйста, введите свой номер телефона",
  //       email: {
  //         required: "Пожалуйста, введите свою почту",
  //         email: "Неправильно введен адрес почты"
  //       }
  //     }
  //   });
  // }
  //   validateForms('#consultation-form');
  //   validateForms('#consultation form');
  //   validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // Скрипт для отправки писемь
    $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
      });
      return false;
  });

    //Регулирование появления кнопки scrolla страници
    $(window).scroll(function() {
      if($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn('slow');
      } else {
        $('.pageup').fadeOut('slow');
      }
    });
    //плавный скролл страницы, после нажатия кнопки scrolla 
    $("a[href^='#up']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });
    //Плавный переход в католог
    $("a[href^='#catalog']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });
    
    new WOW().init();
});

