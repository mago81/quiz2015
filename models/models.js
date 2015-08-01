var path = require('path');

//Postgres DATABASE_URL= postgres://...
//DQLite   DATABASE_URL= sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name     = (url[6]||null);
var user		= (url[2]||null);
var pwd			= (url[3]||null);
var protocol    = (url[1]||null);
var dialect     = (url[1]||null);
var port		= (url[5]||null);
var host 		= (url[4]||null);
var storage     = process.env.DATABASE_STORAGE;

//cargar modelo ORM
var Sequelize = require('sequelize');

//Usar bbdd sqlite:
var sequelize = new Sequelize(DB_name,user,pwd,
					{
						dialect: 	dialect,
						protocol: 	protocol,
						port: 		port,
						host: 		host,
						storage: 	storage,
						omitNull: 	true
					}
					);

//importar definición de la tabla quiz.js:
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

//importar definición de la tabla Comment.js:
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

//Establecer relación entre quiz y comment 1 a N:
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; //exportar definición de Quiz.
exports.Comment = Comment; //exportar definición de Comment.

//sequelize.sync crea e inicializa la tabla:
sequelize.sync().then(function() {
	Quiz.count().then(function (count) {
		if (count===0) {
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma',
						  tema: 'Humanidades'
						});
			Quiz.create({ pregunta: 'Capital de Portugal',
						  respuesta: 'Lisboa',
						  tema: 'Humanidades'
						})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});