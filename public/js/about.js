$(document).ready(function () {
    
    let currentGalleryPhoto = 0,
        vwPad = window.innerWidth * 0.05,
        photoPos = [
            $('#gallery-photo-01').offset().left - vwPad,
            $('#gallery-photo-02').offset().left - vwPad,
            $('#gallery-photo-03').offset().left - vwPad,
            $('#gallery-photo-04').offset().left - vwPad,
            $('#gallery-photo-05').offset().left - vwPad,
            $('#gallery-photo-06').offset().left - vwPad,
            $('#gallery-photo-07').offset().left - vwPad,
            $('#gallery-photo-08').offset().left - vwPad,
            $('#gallery-photo-09').offset().left - vwPad
        ];

    window.addEventListener('resize', () => {
        vwPad = window.innerWidth * 0.05;
        photoPos = [
            $('#gallery-photo-01').offset().left - vwPad,
            $('#gallery-photo-02').offset().left - vwPad,
            $('#gallery-photo-03').offset().left - vwPad,
            $('#gallery-photo-04').offset().left - vwPad,
            $('#gallery-photo-05').offset().left - vwPad,
            $('#gallery-photo-06').offset().left - vwPad,
            $('#gallery-photo-07').offset().left - vwPad,
            $('#gallery-photo-08').offset().left - vwPad,
            $('#gallery-photo-09').offset().left - vwPad
        ];
    });

    console.log(currentGalleryPhoto);

    $('#gallery-arrow-left').click(function (e) {
        if (currentGalleryPhoto > 0) {
            currentGalleryPhoto--;
        }
        $('#gallery-carousel').animate({
            scrollLeft: photoPos[currentGalleryPhoto]
        }, 300);
        console.log(currentGalleryPhoto);
    });

    $('#gallery-arrow-right').click(function (e) {
        if (currentGalleryPhoto < photoPos.length - 1) {
            currentGalleryPhoto++;
        }
        $('#gallery-carousel').animate({
            scrollLeft: photoPos[currentGalleryPhoto]
        }, 300);
        console.log(currentGalleryPhoto);
    });


});
