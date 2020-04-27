$(window).on("load", function () {
  $(window).scroll(function () {
    $(".header-bg").css("opacity", $(".header-bg").offset().top / 200);
    $(".subnav-bg").css("opacity", $(".header-bg").offset().top / 200);
  }).scroll(); //invoke scroll-handler on page-load
});

$(document).ready(function () {

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 50)
        }, 300);
        return false;
      }
    }
  });


  $('a.videotrigger').click(function(e) {
      e.preventDefault();
      var vidSource = $(this).attr('href');
      var vidTarget = $(this).parent();
      $(vidTarget).html("<video autoplay controls playsinline><source src='" + vidSource + "' type='video/mp4'></video>");
  });

  var $hamburger = $(".menu"),
      $menu = $(".nav");

  $hamburger.click(function () {
    $(this).toggleClass("open");
    $menu.toggleClass("open");
    $("body").toggleClass("no-scroll");

    $(".nav ul").children().each(function (i) {
      var $item = $(this);
      if ($item.hasClass("enabled")) {
        $item.removeClass("enabled");
      } else {
        setTimeout(function () {
          $item.addClass("enabled");
        }, 50 * i);
      }

    });

  });


  var menu = $('#filtermenu');

  function showWork(category) {
      $(menu).find('#' + category).addClass('active');
      $(menu).find('a').not('#' + category).removeClass('active');
      if ((64 + ($(document).width() * 0.05)) < 150 ) {
        var subnavOffset = (63 + ($(document).width() * 0.05));
      } else {
        var subnavOffset = 149;
      }
      $('html, body').animate({
        scrollTop: ($('.subnav').offset().top - subnavOffset)
      }, 300);
  }


  $(menu).find('a').each(function() {
      var targetCat = $(this).attr('id');
      $(this).click(function(e) {
          showWork(targetCat);
      });
  });

  // Check if the browser supports HTML5 history
  var historySupport = !!(window.history && history.pushState);

  // Add an event listener for filter clicks
  $(function () {
      $('body').on('click', '#filtermenu a', onFilterClick);
  });


  // Event handler for the filter click
  function onFilterClick (e)
  {

      e.preventDefault();
      var $filter = $(e.currentTarget);
      var href = $filter.attr('href');
      if (historySupport) {
          // Update the browser's address bar
          history.pushState(null, null, href);
      }
      $.ajax($filter.attr("href"), {
          dataType : 'html',
          beforeSend: function() {
             $('.video').hide();
             $('.loader').show();
          },
          success : function (response) {
              refreshProjects(response);
          }
      });
  }

  function refreshProjects (html)
  {

      // Update the <title> tag
      document.title = $(html).filter('title').text();

      // Update the .projects DOM element with new HTML
      var $html = $('<div />').append(html);
      $('.category-content').html($html.find('.category-content').html());
      $('.video').show();
      $('.loader').hide();
      initWorkViewer();

  }

  function initWorkViewer() {
    $('a.work-piece').click(function (e) {
      e.preventDefault();
      $("body").addClass("no-scroll");
      $(".content-viewer").addClass("enabled");
      $.get( $(this).data("content"), function (data) {
        $('.content-viewer').find('.campaign-body').html(data).find('video-carousel')
        initCarousel($('.video-carousel'));
      });
    });

    function initCarousel(carousel) {

      var currentIndex = 0,
          totalVids = $(carousel).data("total");

      function adjustVids(adj) {
        currentIndex = currentIndex + adj;
        var currentVid = ".video" + currentIndex,
            prevVid = ".video" + (currentIndex - 1),
            nextVid = ".video" + (currentIndex + 1);
        $(carousel).find(currentVid).removeClass('prev').removeClass('next').addClass('active');
        $(carousel).find(prevVid).removeClass('active').addClass('prev');
        $(carousel).find(nextVid).removeClass('active').addClass('next');
        $('video').trigger("pause").prop("currentTime", 0);
        $('video.active').attr("controls", "controls").trigger("play");
        $('video').not('.active').removeAttr('controls');
        $(carousel).find('video').each(function () {
          var multiplier = $(this).data("index");
          $(this).css("transform", "translateX(" + (multiplier - currentIndex) * 102 + "%)");
        });
        $('.count').find('.current').html(currentIndex + 1);
        $('.vid-title').html( $('video.active').data("title") );
        if (currentIndex > 0) {
          $('.nav-trigger.p').addClass('active');
        } else {
          $('.nav-trigger.p').removeClass('active');
        }
        if (currentIndex < totalVids) {
          $('.nav-trigger.n').addClass('active');
        } else {
          $('.nav-trigger.n').removeClass('active');
        }
      }

      adjustVids(0);

      $(carousel).find('video').each(function () {
        var multiplier = $(this).data("index");
        $(this).css("transform", "translateX(" + multiplier * 102 + "%)");
        $(this).on('ended', function (e) {
          if ($(this).data("index") != $(this).data("total")) {
            adjustVids(1);
          } else {
            closeWork(e);
          }
        });
      });

      $(carousel).find('.nav-trigger.n').click(function () {
        adjustVids(1);
      });

      $(carousel).find('.nav-trigger.p').click(function () {
        adjustVids(-1);
      });

      

      $(document).keyup(function (e) {
        if (e.keyCode === 37) {
          if (currentIndex > 0) {
            adjustVids(-1);
          }
        } else if (e.keyCode === 39) {
          if (currentIndex < totalVids) {
            adjustVids(1);
          }
        }
      });
      
    }



    function closeWork(e) {
      e.preventDefault();
      $("body").removeClass("no-scroll");
      $(".content-viewer").removeClass("enabled");
      $('.content-viewer').find('.campaign-body').empty();
    }

    $('.content-viewer').find('.close').click(function (e) { closeWork(e); });
    $('.content-viewer').find('.closer-capture').click(function (e) { closeWork(e); });

    $(document).keyup(function (e) {
      if (e.keyCode === 27) {
        closeWork(e);
      }
    });

    
  }

  initWorkViewer();
  
  


});
