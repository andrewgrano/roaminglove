(function() {
  var parallax, post, post2;

  $(document).ready(function() {
    var menuToggle;
    menuToggle = $('#js-mobile-menu').unbind();
    $('#js-navigation-menu').removeClass('show');
    menuToggle.on('click', function(e) {
      e.preventDefault();
      $('#js-mobile-menu .hamburger').toggleClass('is-active');
      $('#js-navigation-menu').slideToggle(function() {
        if ($('#js-navigation-menu').is(':hidden')) {
          $('#js-navigation-menu').removeAttr('style');
        }
      });
    });
  });

  parallax = function() {
    var plxBackground, plxBackgroundTopToPageTop, plxBackgroundTopToWindowBottom, plxBackgroundTopToWindowTop, plxSpeed, plxWindow, plxWindowTopToPageTop, plxWindowTopToWindowTop, windowInnerHeight, windowTopToPageTop;
    if ($('#js-parallax-window').length > 0) {
      plxBackground = $('#js-parallax-background');
      plxWindow = $('#js-parallax-window');
      plxWindowTopToPageTop = $(plxWindow).offset().top;
      windowTopToPageTop = $(window).scrollTop();
      plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;
      plxBackgroundTopToPageTop = $(plxBackground).offset().top;
      windowInnerHeight = window.innerHeight;
      plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
      plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
      plxSpeed = 0.35;
      plxBackground.css('top', -(plxWindowTopToWindowTop * plxSpeed) + 'px');
    }
  };

  $(document).ready(function() {
    var distanceHeadertoScreenTop, headerContent, headerImg, headerTitle;
    if ($('#js-parallax-window').length) {
      parallax();
      $(".parallax-window").fadeTo("fast", 1);
    }
    $(window).scroll(function(e) {
      if ($('#js-parallax-window').length) {
        parallax();
      }
    });
    if ($(".headerContent").length) {
      headerImg = $(".headerContent").children("img").attr("src");
      headerTitle = $(".headerContent").children("h1").text();
      headerContent = $(".parallax-static-content");
      $(".headerWindow .parallax-background").css("background-image", "url(" + headerImg + ")");
      $(".headerWindow .parallax-static-content h1").html(headerTitle);
      distanceHeadertoScreenTop = headerContent.offset().top;
      $(window).scroll(function(e) {
        var MathVar, MathVar2, MathVar3, offset, scrollTop, scrollTopReset, scrollTopReset2, scrollTopResetSlow;
        scrollTop = $(window).scrollTop();
        if (scrollTop >= distanceHeadertoScreenTop) {
          scrollTopReset = scrollTop - distanceHeadertoScreenTop;
          scrollTopResetSlow = scrollTopReset * 0.5;
          MathVar = (30 - scrollTopResetSlow) * 0.01;
          headerContent.css("background", "rgba(0,0,0," + MathVar + ")");
          offset = 60;
          if (scrollTop >= (distanceHeadertoScreenTop + offset)) {
            scrollTopReset2 = scrollTop - (distanceHeadertoScreenTop + offset);
            MathVar2 = (30 - scrollTopReset2) * 0.01;
            MathVar3 = (90 - scrollTopReset2) * 0.01;
            return headerContent.css("text-shadow", "0 " + MathVar2 + "em 10px rgba(0,0,0," + MathVar3 + "");
          }
        } else {
          headerContent.css("background", "rgba(0,0,0,0.3)");
          return headerContent.css("text-shadow", "0 0.3em 10px rgba(0,0,0,0.9)");
        }
      });
      if ($(".headerContent").hasClass("js--hide-on-top")) {
        if ($(window).scrollTop() < 15) {
          headerContent.hide();
        }
        $(window).scroll(function(e) {
          var pos;
          pos = $(window).scrollTop();
          headerContent = $(".parallax-static-content");
          if (pos < 15) {
            return headerContent.fadeOut();
          } else {
            return headerContent.fadeIn();
          }
        });
      }
      if ($(".headerContent").hasClass("is--post")) {
        return $(".headerWindow").addClass("is--post");
      }
    }
  });

  post = [];

  post = $.get(config.api_url, function(res) {
    post = res.posts.slice(config.static_items);
    $('.more--2inarow').removeClass('disabled');
    return $('.more--3inarow').removeClass('disabled');
  });

  $('.more--3inarow').on('click', function() {
    // console.log(post.length);
    //keep loading 6 posts at a time until there are less than 12
    if (post.length > 12) {
      console.log("api 1, post amount is greater than 12; it is " + post.length);
      $('.postWidget__wrapper').append($(templates.post({
        post: post[0]
      })).hide().fadeIn(), $(templates.post({
        post: post[1]
      })).hide().fadeIn(), $(templates.post({
        post: post[2]
      })).hide().fadeIn(), $(templates.post({
        post: post[3]
      })).hide().fadeIn(), $(templates.post({
        post: post[4]
      })).hide().fadeIn(), $(templates.post({
        post: post[5]
      })).hide().fadeIn());
      post.splice(0, 6);
    } else {
      //once there are less than 12 posts (there will be 8)...
      if (post.length >= 6) {
        console.log("api 1, post amount is less than 12; it is " + post.length);
        $('.postWidget__wrapper').append($(templates.post({
          post: post[0]
        })).hide().fadeIn(), $(templates.post({
          post: post[1]
        })).hide().fadeIn(), $(templates.post({
          post: post[2]
        })).hide().fadeIn(), $(templates.post({
          post: post[3]
        })).hide().fadeIn(), $(templates.post({
          post: post[4]
        })).hide().fadeIn(), $(templates.post({
          post: post[5]
        })).hide().fadeIn());
        post.splice(0, 6);
        //load 6 (2 remaining now) and then load the next 100 posts. Disable the btn until they have loaded.
        $('.more--3inarow').addClass('disabled');
        $.get(config.api_url2, function(res) {
          post2 = res.posts;
          $('.more--3inarow').removeClass('disabled');
          return $('.more--3inarow').addClass("loaded-url2");
        });
      }
    }
    if ($(this).hasClass("loaded-url2")) {
      //There are still 2 left over from the original 100 posts. Display those 2 and then 4 from the newly loaded url2
      if (post.length === 2) {
        console.log("YA YOU DID IT, these are the missing 2 posts");

        $('.postWidget__wrapper').append($(templates.post({
          post: post[0]
        })).hide().fadeIn(), $(templates.post({
          post: post[1]
        })).hide().fadeIn(), $(templates.post({
          post: post2[0]
        })).hide().fadeIn(), $(templates.post({
          post: post2[1]
        })).hide().fadeIn(), $(templates.post({
          post: post2[2]
        })).hide().fadeIn(), $(templates.post({
          post: post2[3]
        })).hide().fadeIn());
        post2.splice(0, 4);
        post.splice(0, 2);

      } else {
        //now there are no more posts from url1.
        if (post2.length > 6) {
          console.log("api 2, post amount is greater than 6; it is " + post2.length);
          $('.postWidget__wrapper').append($(templates.post({
            post: post2[0]
          })).hide().fadeIn(), $(templates.post({
            post: post2[1]
          })).hide().fadeIn(), $(templates.post({
            post: post2[2]
          })).hide().fadeIn(), $(templates.post({
            post: post2[3]
          })).hide().fadeIn(), $(templates.post({
            post: post2[4]
          })).hide().fadeIn(), $(templates.post({
            post: post2[5]
          })).hide().fadeIn());
          post2.splice(0, 6);
        } else {
          //these are the 6 final posts
          if (post2.length === 6) {
            console.log("api 2, final 6 posts, post amount is " + post2.length);
            $('.postWidget__wrapper').append($(templates.post({
              post: post2[0]
            })).hide().fadeIn(), $(templates.post({
              post: post2[1]
            })).hide().fadeIn(), $(templates.post({
              post: post2[2]
            })).hide().fadeIn(), $(templates.post({
              post: post2[3]
            })).hide().fadeIn(), $(templates.post({
              post: post2[4]
            })).hide().fadeIn(), $(templates.post({
              post: post2[5]
            })).hide().fadeIn());
            post2.splice(0, 6);
            //load 6 (2 remaining now) and then load the next 100 posts. Disable the btn until they have loaded.
            $('.more--3inarow').addClass('disabled');
            $.get(config.api_url3, function(res) {
              post3 = res.posts;
              console.log("url3 loaded");
              console.log(res.posts);
              $('.more--3inarow').removeClass('disabled');
              return $('.more--3inarow').addClass("loaded-url3");
            });
          }
        }
      }
    }
    if ($(this).hasClass("loaded-url3")) {
      if (post3.length >= 6) {
        console.log("api 3, post amount is greater than 6; it is " + post3.length);
        $('.postWidget__wrapper').append($(templates.post({
          post: post3[0]
        })).hide().fadeIn(), $(templates.post({
          post: post3[1]
        })).hide().fadeIn(), $(templates.post({
          post: post3[2]
        })).hide().fadeIn(), $(templates.post({
          post: post3[3]
        })).hide().fadeIn(), $(templates.post({
          post: post3[4]
        })).hide().fadeIn(), $(templates.post({
          post: post3[5]
        })).hide().fadeIn());
        post3.splice(0, 6);
        if (post3.length === 0) {
          $('.more--3inarow').fadeOut();
        }
      } else if (post3.length === 5) {
        console.log("api 3, post amount is 5; it is " + post3.length);
        $('.postWidget__wrapper').append($(templates.post({
          post: post3[0]
        })).hide().fadeIn(), $(templates.post({
          post: post3[1]
        })).hide().fadeIn(), $(templates.post({
          post: post3[2]
        })).hide().fadeIn(), $(templates.post({
          post: post3[3]
        })).hide().fadeIn(), $(templates.post({
          post: post3[4]
        })).hide().fadeIn());
        post3.splice(0, 5);
        return $('.more--3inarow').fadeOut();
      } else if (post3.length === 4) {
        console.log("api 3, post amount is 4; it is " + post3.length);
        $('.postWidget__wrapper').append($(templates.post({
          post: post3[0]
        })).hide().fadeIn(), $(templates.post({
          post: post3[1]
        })).hide().fadeIn(), $(templates.post({
          post: post3[2]
        })).hide().fadeIn(), $(templates.post({
          post: post3[3]
        })).hide().fadeIn());
        post3.splice(0, 4);
        return $('.more--3inarow').fadeOut();
      } else if (post3.length === 3) {
        console.log("api 3, post amount is 3; it is " + post3.length);
        $('.postWidget__wrapper').append($(templates.post({
          post: post3[0]
        })).hide().fadeIn(), $(templates.post({
          post: post3[1]
        })).hide().fadeIn(), $(templates.post({
          post: post3[2]
        })).hide().fadeIn());
        post3.splice(0, 3);
        return $('.more--3inarow').fadeOut();
      } else if (post3.length === 2) {
        console.log("api 3, post amount is 2; it is " + post3.length);
        $('.postWidget__wrapper').append($(templates.post({
          post: post3[0]
        })).hide().fadeIn(), $(templates.post({
          post: post3[1]
        })).hide().fadeIn());
        post3.splice(0, 2);
        return $('.more--3inarow').fadeOut();
      } else if (post3.length === 1) {
        console.log("api 3, post amount is 1; it is " + post3.length);
        $('.postWidget__wrapper').append($(templates.post({
          post: post3[0]
        })).hide().fadeIn());
        post3.splice(0, 1);
        return $('.more--3inarow').fadeOut();
      }
    }
  });

  // $('.more--2inarow').on('click', function() {
  //   if (post.length >= 4) {
  //     $('.postWidget__wrapper').append($(templates.post({
  //       post: post[0]
  //     })).hide().fadeIn(), $(templates.post({
  //       post: post[1]
  //     })).hide().fadeIn(), $(templates.post({
  //       post: post[2]
  //     })).hide().fadeIn(), $(templates.post({
  //       post: post[3]
  //     })).hide().fadeIn());
  //     return post.splice(0, 4);
  //   } else if (post.length === 3) {
  //     $('.postWidget__wrapper').append($(templates.post({
  //       post: post[0]
  //     })).hide().fadeIn(), $(templates.post({
  //       post: post[1]
  //     })).hide().fadeIn(), $(templates.post({
  //       post: post[2]
  //     })).hide().fadeIn());
  //     post.splice(0, 3);
  //     return $('.more--2inarow').fadeOut();
  //   } else if (post.length === 2) {
  //     $('.postWidget__wrapper').append($(templates.post({
  //       post: post[0]
  //     })).hide().fadeIn(), $(templates.post({
  //       post: post[1]
  //     })).hide().fadeIn());
  //     post.splice(0, 2);
  //     return $('.more--2inarow').fadeOut();
  //   } else if (post.length === 1) {
  //     $('.postWidget__wrapper').append($(templates.post({
  //       post: post[0]
  //     })).hide().fadeIn());
  //     post.splice(0, 1);
  //     return $('.more--2inarow').fadeOut();
  //   }
  // });

  $(function() {
    return $.get(config.api_url_categories, function(res) {
      var categories;
      return categories = res.categories;
    });
  });

}).call(this);
