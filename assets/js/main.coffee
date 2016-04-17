console.log 'hello there!'

post = []

$.get config.api_url, (res) ->
  console.log(res)
  post = res.posts[config.static_items..]
  $('.more').removeClass('disabled')

$('.more').on 'click', ->
  console.log(post)
  if post.length >= 4
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn(),$(templates.post(post: post[1])).hide().fadeIn(),$(templates.post(post: post[2])).hide().fadeIn(),$(templates.post(post: post[3])).hide().fadeIn())
    post.splice(0, 4)
  else if post.length == 3
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn(),$(templates.post(post: post[1])).hide().fadeIn(),$(templates.post(post: post[2])).hide().fadeIn())
    post.splice(0, 3)
    $('.more').fadeOut();
  else if post.length == 2
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn(),$(templates.post(post: post[1])).hide().fadeIn())
    post.splice(0, 2)
    $('.more').fadeOut();
  else if post.length == 1
    $('.postWidget__wrapper').append($(templates.post(post: post[0])).hide().fadeIn())
    post.splice(0, 1)
    $('.more').fadeOut();
