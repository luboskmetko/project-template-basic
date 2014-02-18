//define Modernizr - loaded separately in head
define('modernizr', [], Modernizr);

require.config({
    baseUrl: "assets/js"
});

require(["main"]);
