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
        'main': './resources/public/js/app/app.js',

        // utils
        'kinvey-constants': './resources/public/js/app/utils/constants/kinvey-constants.js',
        'template-generator': './resources/public/js/app/utils/template-generator.js',
        'notifier': './resources/public/js/app/utils/notifier.js',
        'requester': './resources/public/js/app/utils/requester.js',
        'validator': './resources/public/js/app/utils/validator.js',

        // controllers
        'user-controller': './resources/public/js/app/controllers/user-controller.js',
        'thread-controller': './resources/public/js/app/controllers/thread-controller.js',
        'thread-data' :'./resources/public/js/app/thread-data.js'
    }
});


System.import('main');

