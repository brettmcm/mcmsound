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
        $('.content-viewer').find('.campaign-body').html(data).find('video').on('ended', function () {
          closeWork(e);
        });
      });
    });

    function closeWork(e) {
      e.preventDefault();
      $("body").removeClass("no-scroll");
      $(".content-viewer").removeClass("enabled");
      $('.content-viewer').find('.campaign-body').empty();
    }

    $('.content-viewer').find('.close').click(function (e) {
      closeWork(e);
    });

    $(document).keyup(function (e) {
      if (e.keyCode === 27) {
        closeWork(e);
      }
    });

    
  }

  initWorkViewer();
  
  


});
