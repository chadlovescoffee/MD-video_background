
hero_video = {

  app: function() {

    // Required JS
    var required_js = [
        'js/materialize.min.js',
        'js/tubeplayer.min.js'
    ];

    // Required CSS
    var required_css = [
      'http://fonts.googleapis.com/icon?family=Material+Icons',
      'css/materialize.min.css',
      'css/hero_video.min.css'
    ];


    // JS HTML
    var js_i = 0;
    var js_html = '';

    $(required_js).each(function () {
      if (!$('head script[src="' + required_js[js_i] + '"]').length > 0) {
        js_html = '<script type="text/javascript" src="' + required_js[js_i] + '"></script>';
      }
      ++js_i;
    });


    // CSS HTML
    var css_i = 0;
    var css_html = '';

    $(required_css).each(function () {
      if (!$('head link[href="' + required_css[css_i] + '"]').length > 0) {
        css_html += '<link href="' + required_css[css_i] + '" rel="stylesheet">';
      }
      ++css_i;
    });

    $('head').append(js_html + css_html);


    // Destination
    var destination = hero_video_setup.destination;

    // Hero Video HTML
    var hero_html = '<div class="cover" style="background-image:url(' + hero_video_setup.cover + ')"></div>';
    if($(window).width() >= 768) {

      // Desktop
      hero_html +=
        '<div class="blocked"></div>' +
        '<div class="controls row">' +
        '   <div class="col s6">' +
        '       <div class="play material-icons waves-effect hide">play_arrow</div>' +
        '       <div class="pause material-icons waves-effect">pause</div>' +
        '   </div>' +
        '   <div class="col s6">' +
        '       <div class="mute material-icons hide">volume_up</div>' +
        '       <div class="unmute material-icons">volume_off</div>' +

        '   </div>' +
        '</div>';
    } else {

      // Mobile Version
      hero_html +=
        '<div class="mobile">' +
        '</div>';

    }


    // Document Ready
    $( document ).ready(function() {

      $(destination).html('<div class="hero_video_pkg" style="display: none;">' + hero_html + '</div>');


      if($(window).width() >= 768) {

        $(destination + ' .hero_video_pkg').tubeplayer({
          width: 300, // the width of the player
          height: 169, // the height of the player
          autoPlay: true,
          loop: 1,
          allowFullScreen: "true", // true by default, allow user to go full screen
          initialVideo: hero_video_setup.youtube_id, // the video that is loaded into the player
          preferredQuality: "default",// preferred quality: default, small, medium, large, hd720
          onPlay: function(id){}, // after the play method is called
          onPlayerPlaying: function(){
            mute_first_play();
            hero_video_resize();
            $(destination + ' iframe').addClass('on');
            $(destination + ' .cover').delay(800).fadeOut();
          },
          onPause: function(){}, // after the pause method is called
          onStop: function(){}, // after the player is stopped
          onSeek: function(time){}, // after the video has been seeked to a defined point
          onPlayerCued: function(){},
          onMute: function(){}, // after the player is muted
          onUnMute: function(){} // after the player is unmuted
        });

      }
    });


    //Window Resize
    $(window).resize(function () {

      if($(window).width() >= 768) {
        hero_video_resize();
      }

    });



    // Resize Hero
    function hero_video_resize() {

      var video_width = $(destination).width();
      $(destination + ' .hero_video_pkg').css('height', Math.floor(video_width * hero_video_setup.frame_height / 100));

      $(destination + ' iframe')
        .css('width', video_width)
        .css('height', video_width)
        .css('margin-top', Math.floor(video_width * hero_video_setup.margin_top / 100))
        ;
    }


    //mute on auto-play
    function mute_first_play(){
      if(!$(destination + ' .hero_video_pkg').hasClass('played') ){
        $(destination + ' .hero_video_pkg .mute').click();
        $(destination + ' .hero_video_pkg').addClass('played');
      }
    }



    //Controls click
    $(document).on('click', destination + ' .controls .material-icons', function() {

        $(this).addClass('hide');

        //pause
        if($(this).hasClass('pause')){
          $(destination + ' .play').removeClass('hide');
          $(destination + ' .hero_video_pkg').tubeplayer('pause');
        }

        //play
        if($(this).hasClass('play')){
          $(destination + ' .pause').removeClass('hide');
          $(destination + ' .hero_video_pkg').tubeplayer('play');
        }

        //unmute
        if($(this).hasClass('unmute')){
          $(destination + ' .mute').removeClass('hide');
          $(destination + ' .hero_video_pkg').tubeplayer('unmute');
        }

        //mute
        if($(this).hasClass('mute')){
          $(destination + ' .unmute').removeClass('hide');
          $(destination + ' .hero_video_pkg').tubeplayer('mute');
        }
    });

  } //end app

};
