SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': '../../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        // libs
        'jquery': '../../bower_components/jquery/dist/jquery.js',
        'sammy': '.../../bower_components/sammy/lib/sammy.js',
        'handlebars': '../../bower_components/handlebars/handlebars.js',
        'toastr': '../../bower_components/toastr/toastr.js',

        // scripts
        'test': './test.js',

        // utils
        'kinvey-constants': '../public/js/app/utils/constants/kinvey-constants.js',
        'template-generator': '../public/js/app/utils/template-generator.js',
        'notifier': '../public/js/app/utils/notifier.js',
        'requester': '../public/js/app/utils/requester.js',
        'validator': '../public/js/app/utils/validator.js',
        'cleaner': '../public/js/app/utils/cleanUpInputField.js',

        // controllers
        'user-controller': '../public/js/app/controllers/user-controller.js',
        'thread-controller': '../public/js/app/controllers/thread-controller.js',
        'thread-data': '../public/js/app/thread-data.js',
        'user-data': '../public/js/app/user-data.js',
        'Post': '../public/js/app/models/post.js'
    }
});


System.import('test');

