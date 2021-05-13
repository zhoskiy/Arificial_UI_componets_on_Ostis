module.exports = function (grunt) {
    const addGameDirPath = './addGame/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            addGame: {
                src: [addGameDirPath + 'src/*.js'],
                dest: addGameDirPath + 'static/js/addGame.js'
            },
        },
        copy: {
            addGameJs: {
                cwd: addGameDirPath + 'static/js/',
                src: 'addGame.js',
                dest: clientJsDirPath + 'addGame/',
                expand: true,
                flatten: true
            },
            addGAmeCss: {
                cwd: addGameDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            addGameHtml: {
                cwd: addGameDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },

        },
        watch: {
            addGameJs: {
                files: addGameDirPath + 'src/**',
                tasks: ['concat:addGame', 'copy:addGameJs'],
            },
            addGameCss: {
                files: addGameDirPath + 'static/css/**',
                tasks: ['copy:addGameCss'],
            },
            addGameHtml: {
                files: [addGameDirPath + 'static/html/**'],
                tasks: ['copy:addGameHtml'],
            },
           
        },
        exec: {
            updateCssAndJs: 'sh scripts/update_css_and_js.sh'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['concat', 'copy', 'exec:updateCssAndJs', 'watch']);
    grunt.registerTask('build', ['concat', 'copy', 'exec:updateCssAndJs']);

};
