module.exports = function (grunt) { 
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks); 
    // Project configuration. 
    grunt.initConfig({ 
        pkg: grunt.file.readJSON('package.json'), 
        cssmin: { 
            sitecss: { 
                options: { 
                    banner: '' 
                }, 
                files: { 
                    'dist/dsgvo-video-embed.min.css': [ 
                        'css/dsgvo-video-embed.css'
                    ] 
                } 
            } 
        }, 
        uglify: { 
            options: { 
                compress: true 
            }, 
            applib: { 
                src: [ 
                    'js/dsgvo-video-embed.js'
                ], 
                dest: 'dist/dsgvo-video-embed.min.js' 
            } 
        } 
    }); 
    // Default task. 
    grunt.registerTask('default', [
        'cssmin', 
        'uglify'
    ]); 
};
