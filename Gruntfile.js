module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-cafe-mocha');

	grunt.initConfig({
        concat: {
            dist : {
                options: {
                    banner: '(function() {\n',
                    footer: '\n})();'
                },
                src : [	
                        'src/intro.js',
                        'src/token.js', 
                        'src/syntax.js', 
                        'src/lexical.js',
                        'src/executeVisitor.js',
                        'src/executionContext.js',
                        'src/interpreter.js'
                ],
                dest: 'brainfuck.js'
            },
        },

        cafemocha : {
            executionContextTest : {
                src: 'test/test.js',
            },
        }
    });

    grunt.task.registerTask('default', [ 'concat', 'cafemocha' ]);
    
    grunt.task.registerTask('travis', [ 'concat', 'cafemocha' ]);
};