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

api_url = 'https://public-api.wordpress.com/rest/v1/sites/107.170.229.16/posts?number=100'

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

  extensions: [
    js_pipeline(files: 'assets/js/*.coffee'),
    css_pipeline(files: 'assets/css/*.styl'),
    wordpress
      site: '107.170.229.16'
      post_types:
        post:
          template: 'views/_single.jade'
          number: 10
    config(api_url: api_url, static_items: 10),
    templates(base: 'views/templates')
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
