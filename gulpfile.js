var elixir = require("laravel-elixir");
require('laravel-elixir-vueify');

elixir(function(mix) {
    mix
        .sass('app.scss')
        .browserify('app.js', 'public/js/app.js')
});
