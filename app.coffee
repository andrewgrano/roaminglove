axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
wordpress    = require 'roots-wordpress'
moment       = require 'moment'
string       = require 'string'
config       = require 'roots-config'
templates    = require 'client-templates'
records      = require 'roots-records'

api_url  = 'https://public-api.wordpress.com/rest/v1/sites/107.170.229.16/posts?number=100&page=1'
api_url2 = 'https://public-api.wordpress.com/rest/v1/sites/107.170.229.16/posts?number=100&page=2'

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

  extensions: [
    js_pipeline(files: 'assets/js/*.coffee'),
    css_pipeline(files: 'assets/css/*.styl'),
    # wordpress
    #   site: '107.170.229.16'
    #   post_types:
    #     post:
    #       template: 'views/_single.jade'
    #       number: 100
    config(api_url: api_url, api_url2: api_url2, static_items: 14),
    templates(base: 'views/templates')
    records(
      categories: {
        url: 'https://public-api.wordpress.com/rest/v1/sites/107.170.229.16/categories',
        # path: 'categories',
        hook: (data) -> data.categories,
        template: "views/_category.jade",
        out: (category) -> "/places/#{category.name.replace(/ /g, "-")}"
      }
      post: {
        url: 'https://public-api.wordpress.com/rest/v1/sites/107.170.229.16/posts?number=100&page=1',
        # data: 'foobar',
        hook: (data) -> data.posts
        template: "views/_single.jade",
        out: (post) -> "/post/#{post.slug}"
      }
      authors: {
        data: [{ name: 'Sigournee Grano', slug: 'sigournee-grano', index: 1 },
               { name: 'Elizabeth Maccoy', slug: 'elizabeth-maccoy', index: 2 },
               { name: 'Stefana Puscasu', slug: 'stefana-puscasu', index: 3 },
               { name: 'Karine Van Den Heuvel', slug: 'karine-van-den-heuvel', index: 4 },
               { name: 'Lucy Jamison', slug: 'lucy-jamison', index: 5 },
               { name: 'Luz Carreiro', slug: 'luz-carreiro', index: 6 },
               { name: 'Parniyan Fakharzadeh', slug: 'parniyan-fakharzadeh', index: 7 },
               { name: 'Drame Djibril', slug: 'drame-djibril', index: 8 },
               { name: 'Nicole Marie Kitching', slug: 'nicole-marie-kitching', index: 9 }],
        template: "views/_author.jade",
        out: (author) -> "/authors/#{author.slug}"
      }
    )
  ]

  stylus:
    use: [axis(), rupture(), autoprefixer()]
    sourcemap: true

  'coffee-script':
    sourcemap: true

  locals:
    moment: moment
    string: string

  jade:
    pretty: true
