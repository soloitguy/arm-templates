module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsonlint: {
            all: {
                src: [
                    'templates/*.json',
                    'components/*.json',
                    'deprecated/*.json'
                ],
                options: {
                    format: true,
                    indent: 2,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.registerTask('default', ['jsonlint']);
};