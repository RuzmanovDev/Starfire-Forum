SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // libs
        'jquery': './bower_components/jquery/dist/jquery.js',
        'sammy': './bower_components/sammy/lib/sammy.js',
        'handlebars': './bower_components/handlebars/handlebars.js',
        'toastr': './bower_components/toastr/toastr.js',
        // scripts
        'main': './js/app.js',
        // utils
        'kinvey-constants': 'js/utils/constants/kinvey-constants.js',
        'template-generator': 'js/utils/template-generator.js',
        'notifier': 'js/utils/notifier.js',
        'requester': 'js/utils/requester.js',
        // controllers
        'user-controller': 'js/controllers/user-controller.js',
        'thread-controller': 'js/controllers/thread-controller.js'
    }
});


System.import('main');

