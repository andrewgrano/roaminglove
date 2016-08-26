(function() {
  var categories, post;

  console.log('hello there!');

  post = [];

  $.get(config.api_url, function(res) {
    post = res.posts.slice(config.static_items);
    return $('.more').removeClass('disabled');
  });

  $('.more').on('click', function() {
    if (post.length >= 4) {
      $('.postWidget__wrapper').append($(templates.post({
        post: post[0]
      })).hide().fadeIn(), $(templates.post({
        post: post[1]
      })).hide().fadeIn(), $(templates.post({
        post: post[2]
      })).hide().fadeIn(), $(templates.post({
        post: post[3]
      })).hide().fadeIn());
      return post.splice(0, 4);
    } else if (post.length === 3) {
      $('.postWidget__wrapper').append($(templates.post({
        post: post[0]
      })).hide().fadeIn(), $(templates.post({
        post: post[1]
      })).hide().fadeIn(), $(templates.post({
        post: post[2]
      })).hide().fadeIn());
      post.splice(0, 3);
      return $('.more').fadeOut();
    } else if (post.length === 2) {
      $('.postWidget__wrapper').append($(templates.post({
        post: post[0]
      })).hide().fadeIn(), $(templates.post({
        post: post[1]
      })).hide().fadeIn());
      post.splice(0, 2);
      return $('.more').fadeOut();
    } else if (post.length === 1) {
      $('.postWidget__wrapper').append($(templates.post({
        post: post[0]
      })).hide().fadeIn());
      post.splice(0, 1);
      return $('.more').fadeOut();
    }
  });

  categories = [];

  $.get('https://public-api.wordpress.com/rest/v1/sites/107.170.229.16/categories', function(res) {
    return categories = res.categories[2];
  });

  $('.foobar').on('click', function() {
    $('.postWidget__wrapper').append($(templates.category({
      post: categories[2]
    })).hide().fadeIn());
    return categories.splice(0, 1);
  });

}).call(this);

 //# sourceMappingURL=main.js.map