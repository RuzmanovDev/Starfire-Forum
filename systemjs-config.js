SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // libs
        'jquery': './bower_components/jquery/dist/jquery.js',
        'sammy': 'bower_components/sammy/lib/sammy.js',

        // scripts
        'main': './js/app.js'
    }
});


System.import('main');

