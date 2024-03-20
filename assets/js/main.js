!(function ($) {
  ("use strict");


  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $('#hero').css({
      height: $(window).height()
    });
  }

  // Intro carousel
  var heroCarousel = $("#heroCarousel");
  var heroCarouselIndicators = $("#hero-carousel-indicators");
  heroCarousel
    .find(".carousel-inner")
    .children(".carousel-item")

  heroCarousel.on("slid.bs.carousel", function (e) {
    $(this).find("h2").addClass("animate__animated animate__fadeInDown");
    $(this)
      .find("p, .btn-get-started")
      .addClass("animate__animated animate__fadeInUp");
  });

  console.log('hello world')

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $("#header").outerHeight() - 17;
  $(document).on(
    "click",
    ".nav-menu a, .mobile-nav a, .scrollto",
    function (e) {
      if (
        location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        if (target.length) {
          e.preventDefault();

          var scrollto = target.offset().top - scrolltoOffset;

          if ($(this).attr("href") == "#header") {
            scrollto = 0;
          }

          $("html, body").animate(
            {
              scrollTop: scrollto,
            },
            1500,
            "easeInOutExpo"
          );

          if ($(this).parents(".nav-menu, .mobile-nav").length) {
            $(".nav-menu .active, .mobile-nav .active").removeClass("active");
            $(this).closest("li").addClass("active");
          }

          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").fadeOut();
          }
          return false;
        }
      }
    }
  );

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, .mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass("active");
      }
    });
  });

  // Show and hide whatsapp-icon
  $(window).scroll(function () {
    let icon = $(".whatsapp-icon");
    let heightFooter = $(".footer-main").height();
    let documentHeight = $(document).height();

    let scrollTopWindow = $(window).scrollTop();
    let bottomWindow = $(window).innerHeight() + scrollTopWindow;
    let documentOutFooter = documentHeight - heightFooter;

    if (
      // bottomWindow <= heigthHero ||
      documentOutFooter <= bottomWindow
    ) {
      icon.hide("fast");
    } else {
      icon.show("fast");
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  // Mobile Navigation
  if ($(".nav-menu").length) {
    var $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass(
        "icofont-navigation-menu icofont-close"
      );
      $(".mobile-nav-overly").toggle();
    });

    $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass("active");
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  document.getElementById("whatsappButton").addEventListener("click", () => {
    let number = +5403786410905;

    let name = document.getElementById("clientName").value;
    let textClient = document.getElementById("whatsappText").value;
    const textToSend =
      name === ""
        ? `Hola, me interesa saber sobre los 
    servicios que ofrece CHICO Fishing:%0a${textClient}`
        : `Hola, mi nombre es ${name} me interesa saber sobre los 
    servicios que ofrece CHICO Fishing:%0a
    ${textClient}`;

    const url = `https://wa.me/${number}?text=${textToSend}`;

    window.open(url, "_blank").focus();
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }




  //Contentful connect limit 3 items
  // var client = contentful.createClient({
  //   space: "rrf8x8ztwkew",
  //   accessToken: "URf70KaEdgfgrSf4t6pYgudwg0Gmw-H_wuDIgJexO8A",
  // });
  // client
  //   .getEntries({
  //     limit: 3,
  //     content_type: "post",
  //   })
  //   .then(function (entries) {
  //     entries.items.forEach(function (entry) {
  //       $("#last-news").append(`
  //         <div class="col-lg-4 col-md-10" >
  //          <a href="notice.html">
  //           <article class="entry">
  //             <div class="entry-img">
  //               <img src="http:${entry.fields.image.fields.file.url}" class="img-fluid" alt="">
  //             </div>
  //             <h2 class="entry-title">
  //               ${entry.fields.title}
  //             </h2>
  //             <div class="entry-meta">
  //             </div>
  //             <div class="entry-content">
  //               <p>
  //                 ${entry.fields.description}
  //               </p>
  //             </div>
  //           </article>
  //         </a>
  //        </div>`);
  //     });
  //   });

  // let state = {
  //   page: 1,
  //   limit: 3,
  //   window: 3,
  // };

  // const loadNews = () => {
  //   client
  //     .getEntries({
  //       content_type: "post",
  //     })
  //     .then(function (entries) {
  //       const limit = state.limit;
  //       const totalNews = entries.total;
  //       const pagesQuantity = Math.ceil(totalNews / limit);

  //       client
  //         .getEntries({
  //           content_type: "post",
  //           limit: limit,
  //           skip: (state.page - 1) * limit,
  //         })
  //         .then(function (entries) {
  //           document.getElementById("news").innerHTML = "";
  //           entries.items.forEach(function (entry) {
  //             $("#news").append(`
  //         <div class="col-lg-4 col-md-10" >
  //          <a href="notice.html">
  //           <article class="entry">
  //             <div class="entry-img">
  //               <img src="http:${entry.fields.image.fields.file.url}" class="img-fluid" alt="">
  //             </div>
  //             <h2 class="entry-title">
  //               ${entry.fields.title}
  //             </h2>
  //             <div class="entry-meta">
  //               <ul>
  //                 <li class="d-flex align-items-center"><i class="icofont-user"></i>
  //                   User
  //                 </li>
  //                 <li class="d-flex align-items-center"><i class="icofont-wall-clock"></i>
  //                   <time datetime="2020-01-01">
  //                     20/05/2022
  //                   </time>
  //                 </li>
  //               </ul>
  //             </div>
  //             <div class="entry-content">
  //               <p>
  //                 ${entry.fields.description}
  //               </p>
  //             </div>
  //           </article>
  //         </a>
  //        </div>`);
  //           });
  //         });
  //       pageButtons(pagesQuantity);
  //     });
  // };

  // loadNews();

  // document.getElementById("down-pages").addEventListener("click", () => {
  //   --state.page;
  //   loadNews();
  // });


  // Show and hide whatsapp-icon
  $(window).scroll(function () {
    let scrollTop = $(window).scrollTop();
    if (scrollTop >= 3420) {
      console.log('Box-service')
      $("#service-class-id").addClass("service-animation");
    }else{
     $("#service-class-id").removeClass("service-animation")
    }
  });

 // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox({
        'share': false
      });
    });
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // ---->>>>>>>  Services-box opening when scrolling
  // $(window).scroll(function () {
  //   let scrollTop = $(window).scrollTop();
  //   let boxes = $('.service_inner-1')
  //   let initialTime = 1000
  //   let topScrollLimit = 3420
  //   if (scrollTop >= topScrollLimit) {
  //     boxes.each(function (idx) {
  //       let infoBox = $(this)
  //       infoBox.show((idx + 1) * initialTime)
  //     })
  //   } else {
  //     boxes.each(function () {
  //       let infoBox = $(this)
  //       infoBox.slideUp(initialTime)
  //       infoBox.data('hide', 'false')
  //     })
  //   }
  // });



  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });
})(jQuery);
