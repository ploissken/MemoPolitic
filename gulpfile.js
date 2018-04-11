const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const model = require('./model');

gulp.task('serve', function() {
    var server = nodemon({
        script: 'index.js', 
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });

    server.on('restart', function() {
        console.log("NodeJS restarted!");
    
    }).on('crash', function() {
        console.error("NodeJS has crashed!");
        // Restart the server in 5 seconds 
        stream.emit('restart', 5); 
    });
});


gulp.task('db-build', function() {
    model.sequelize.sync( { force: true })
        .then(function() {
            console.log("Banco de Dados criado.");
            process.exit(0);
        }).catch(function(error) {
            console.error("Falha ao criar BD.", error);
            process.exit(-1);
        });
});