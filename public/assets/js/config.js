//define Modernizr - loaded separately in head
define('modernizr', [], Modernizr);

require.config({
    baseUrl: "assets/js",
    shim: {

    },
    paths: {
        jquery: "../bower_components/jquery/dist/jquery.min"
    }
});

require(["main"]);
