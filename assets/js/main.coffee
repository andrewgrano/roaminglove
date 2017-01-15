# console.log 'hello there!'


$(document).ready ->
  menuToggle = $('#js-mobile-menu').unbind()
  $('#js-navigation-menu').removeClass 'show'
  menuToggle.on 'click', (e) ->
    e.preventDefault()
    $('#js-mobile-menu .hamburger').toggleClass('is-active')
    $('#js-navigation-menu').slideToggle ->
      if $('#js-navigation-menu').is(':hidden')
        $('#js-navigation-menu').removeAttr 'style'
      return
    return
  return


# parallax window
parallax = ->
  if $('#js-parallax-window').length > 0
    plxBackground = $('#js-parallax-background')
    plxWindow = $('#js-parallax-window')
    plxWindowTopToPageTop = $(plxWindow).offset().top
    windowTopToPageTop = $(window).scrollTop()
    plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop
    plxBackgroundTopToPageTop = $(plxBackground).offset().top
    windowInnerHeight = window.innerHeight
    plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop
    plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop
    plxSpeed = 0.35
    plxBackground.css 'top', -(plxWindowTopToWindowTop * plxSpeed) + 'px'
  return

$(document).ready ->
  if $('#js-parallax-window').length
    parallax()
    $(".parallax-window").fadeTo( "fast", 1 );


  $(window).scroll (e) ->
    if $('#js-parallax-window').length
      parallax()
    return


  if $(".headerContent").length
    headerImg = $(".headerContent").children("img").attr("src")
    headerTitle = $(".headerContent").children("h1").text()
    headerContent = $(".parallax-static-content")
    $(".headerWindow .parallax-background").css("background-image", "url(" + headerImg + ")")
    $(".headerWindow .parallax-static-content h1").html(headerTitle)

# text-shadow: 0 6px 10px rgba(0,0,0,0.9)
    distanceHeadertoScreenTop = headerContent.offset().top
    $(window).scroll (e) ->
      scrollTop = $(window).scrollTop()
      # console.log(scrollTop + " is the scrollTop")
      # console.log(distanceHeadertoScreenTop)
      if scrollTop >= distanceHeadertoScreenTop
        scrollTopReset = scrollTop - distanceHeadertoScreenTop
        scrollTopResetSlow = scrollTopReset * 0.5
        MathVar = (30 - scrollTopResetSlow) * 0.01
        # console.log(scrollTopReset)
        headerContent.css("background", "rgba(0,0,0," + MathVar + ")")
        # if background is at an opacity of 0.1 or less
        offset = 60
        if scrollTop >= (distanceHeadertoScreenTop + offset)
          scrollTopReset2 = scrollTop - (distanceHeadertoScreenTop + offset)
          # scrollTopReset2Slow = scrollTopReset2 * 0.5
          MathVar2 = (30 - scrollTopReset2) * 0.01
          MathVar3 = (90 - scrollTopReset2) * 0.01
          # console.log("MathVar2 is " + MathVar2)
          # console.log("YES! Current scrollTop is " + scrollTop + "and scrollTopReset2 is " + scrollTopReset2)
          headerContent.css("text-shadow", "0 " + MathVar2 + "em 10px rgba(0,0,0," + MathVar3 + "")
        # if scrollTopReset > 100
        #   scrollTopResetAgain = scrollTopReset - 100
        #   MathVar = (100 - scrollTopResetAgain) * 0.01
        #   headerContent.css("opacity", MathVar)
      else
        headerContent.css("background", "rgba(0,0,0,0.3)");
        headerContent.css("text-shadow", "0 0.3em 10px rgba(0,0,0,0.9)");



    if $(".headerContent").hasClass("js--hide-on-top")
      if $(window).scrollTop() < 15
        headerContent.hide();
      $(window).scroll (e) ->
        pos = $(window).scrollTop();
        headerContent = $(".parallax-static-content")
        if pos < 15
          headerContent.fadeOut();
        else
          headerContent.fadeIn();
    # else
    #   $(".header .parallax-static-content").css("background", "rgba(0,0,0,0)");


post = []

$.get config.api_url, (res) ->
  # console.log(res)
  post = res.posts[config.static_items..]
  $('.more--2inarow').removeClass('disabled')
  $('.more--3inarow').removeClass('disabled')

$('.more--2inarow').on 'click', ->
  # console.log(post)
  if post.length >= 4
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn(),$(templates.post(post: post[1])).hide().fadeIn(),$(templates.post(post: post[2])).hide().fadeIn(),$(templates.post(post: post[3])).hide().fadeIn())
    post.splice(0, 4)
  else if post.length == 3
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn(),$(templates.post(post: post[1])).hide().fadeIn(),$(templates.post(post: post[2])).hide().fadeIn())
    post.splice(0, 3)
    $('.more--2inarow').fadeOut();
  else if post.length == 2
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn(),$(templates.post(post: post[1])).hide().fadeIn())
    post.splice(0, 2)
    $('.more--2inarow').fadeOut();
  else if post.length == 1
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn())
    post.splice(0, 1)
    $('.more--2inarow').fadeOut();

$('.more--3inarow').on 'click', ->
  # console.log(post)
  if post.length >= 6
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn(),$(templates.post(post: post[1])).hide().fadeIn(),$(templates.post(post: post[2])).hide().fadeIn(),$(templates.post(post: post[3])).hide().fadeIn(),$(templates.post(post: post[4])).hide().fadeIn(),$(templates.post(post: post[5])).hide().fadeIn())
    post.splice(0, 6)
  else if post.length == 5
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn(),$(templates.post(post: post[1])).hide().fadeIn(),$(templates.post(post: post[2])).hide().fadeIn(),$(templates.post(post: post[3])).hide().fadeIn(),$(templates.post(post: post[4])).hide().fadeIn())
    post.splice(0, 5)
    $('.more--3inarow').fadeOut();
  else if post.length == 4
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn(),$(templates.post(post: post[1])).hide().fadeIn(),$(templates.post(post: post[2])).hide().fadeIn(),$(templates.post(post: post[3])).hide().fadeIn())
    post.splice(0, 4)
    $('.more--3inarow').fadeOut();
  else if post.length == 3
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn(),$(templates.post(post: post[1])).hide().fadeIn(),$(templates.post(post: post[2])).hide().fadeIn())
    post.splice(0, 3)
    $('.more--3inarow').fadeOut();
  else if post.length == 2
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn(),$(templates.post(post: post[1])).hide().fadeIn())
    post.splice(0, 2)
    $('.more--3inarow').fadeOut();
  else if post.length == 1
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn())
    post.splice(0, 1)
    $('.more--3inarow').fadeOut();


# this was all stuff I was playing around with. none of it works.
# categories = []

# $.get 'https://public-api.wordpress.com/rest/v1/sites/107.170.229.16/categories', (res) ->
#   # console.log(res)
#   categories = res.categories[2]

# $('.foobar').on 'click', ->
#   # console.log(categories)
#   $('.postWidget__wrapper').append($(templates.category(post: categories[2])).hide().fadeIn())
#   categories.splice(0, 1)




$ ->
  $.get config.api_url_categories, (res) ->
    # console.log(res)
    categories = res.categories

  # console.log("DOM is ready")
