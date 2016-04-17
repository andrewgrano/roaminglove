(function() {
  var post;

  console.log('hello there!');

  post = [];

  $.get(config.api_url, function(res) {
    console.log(res);
    return post = res.posts.slice(config.static_items);
  });

  $('.more').on('click', function() {
    console.log(post);
    if (post.length >= 4) {
      $('.postWidget__wrapper').append(templates.post({
        post: post[0]
      }), templates.post({
        post: post[1]
      }), templates.post({
        post: post[2]
      }), templates.post({
        post: post[3]
      }));
      return post.splice(0, 4);
    } else if (post.length === 3) {
      $('.postWidget__wrapper').append(templates.post({
        post: post[0]
      }), templates.post({
        post: post[1]
      }), templates.post({
        post: post[2]
      }));
      post.splice(0, 3);
      return $('.more').fadeOut();
    } else if (post.length === 2) {
      $('.postWidget__wrapper').append(templates.post({
        post: post[0]
      }), templates.post({
        post: post[1]
      }));
      post.splice(0, 2);
      return $('.more').fadeOut();
    } else if (post.length === 1) {
      $('.postWidget__wrapper').append(templates.post({
        post: post[0]
      }));
      post.splice(0, 1);
      return $('.more').fadeOut();
    }
  });

}).call(this);

 //# sourceMappingURL=main.js.map