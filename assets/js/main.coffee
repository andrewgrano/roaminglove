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

# this was all stuff I was playing around with. none of it works.
categories = []

$.get 'https://public-api.wordpress.com/rest/v1/sites/107.170.229.16/categories', (res) ->
  console.log(res)
  categories = res.categories[2]

$('.foobar').on 'click', ->
  console.log(categories)
  $('.postWidget__wrapper').append($(templates.category(post: categories[2])).hide().fadeIn())
  categories.splice(0, 1)
