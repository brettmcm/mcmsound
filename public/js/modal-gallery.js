$(document).ready(function () {


    $('#gallery-launch').click(function (e) {
        e.preventDefault();
        $("body").addClass("no-scroll");
        $(".modal-gallery").addClass("enabled");
        // $.get($(this).data("content"), function (data) {
        //     $('.modal-gallery').find('.modal-body').html(data).find('carousel')
        //     initCarousel($('.carousel'));
        // });
        initCarousel($('.carousel'));
    });

    function initCarousel(carousel) {

        var currentIndex = 0,
            totalImages = $(carousel).data("total");

        function adjustImg(adj) {
            currentIndex = currentIndex + adj;
            var currentImg = ".image" + currentIndex,
                prevImg = ".image" + (currentIndex - 1),
                nextImg = ".image" + (currentIndex + 1);
            $(carousel).find(currentImg).removeClass('prev').removeClass('next').addClass('active');
            $(carousel).find(prevImg).removeClass('active').addClass('prev');
            $(carousel).find(nextImg).removeClass('active').addClass('next');
            $('img').trigger("pause").prop("currentTime", 0);
            $('img.active').attr("controls", "controls").trigger("play");
            $('img').not('.active').removeAttr('controls');
            $(carousel).find('img').each(function () {
                var multiplier = $(this).data("index");
                $(this).css("transform", "translateX(" + (multiplier - currentIndex) * 102 + "%)");
            });
            $('.count').find('.current').html(currentIndex + 1);
            // $('.vid-title').html($('image.active').data("title"));
            if (currentIndex > 0) {
                $('.nav-trigger.p').addClass('active');
            } else {
                $('.nav-trigger.p').removeClass('active');
            }
            if (currentIndex < totalImages - 1) {
                $('.nav-trigger.n').addClass('active');
            } else {
                $('.nav-trigger.n').removeClass('active');
            }
        }

        adjustImg(0);

        $(carousel).find('img').each(function () {
            var multiplier = $(this).data("index");
            $(this).css("transform", "translateX(" + multiplier * 102 + "%)");
        });

        $(carousel).find('.nav-trigger.n').click(function () {
            adjustImg(1);
        });

        $(carousel).find('.nav-trigger.p').click(function () {
            adjustImg(-1);
        });



        $(document).keyup(function (e) {
            if (e.keyCode === 37) {
                if (currentIndex > 0) {
                    adjustImg(-1);
                }
            } else if (e.keyCode === 39) {
                if (currentIndex < totalImages - 1) {
                    adjustImg(1);
                }
            }
        });

    }



    function closeWork(e) {
        e.preventDefault();
        $("body").removeClass("no-scroll");
        $(".modal-gallery").removeClass("enabled");
        $('.modal-gallery').find('.campaign-body').empty();
    }

    $('.modal-gallery').find('.close').click(function (e) { closeWork(e); });
    // $('.modal-gallery').find('.closer-capture').click(function (e) { closeWork(e); });

    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            closeWork(e);
        }
    });

});