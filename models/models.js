var path = require('path');

//cargar modelo ORM
var Sequelize = require('sequelize');

//Usar bbdd sqlite:
var sequelize = new Sequelize(null,null,null,
					{dialect: "sqlite", storage: "quiz.sqlite"}
					);

//importar definición de la tabla quiz.js:
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //exportar definición

//sequelize.sync crea e inicializa la tabla:
sequelize.sync().success(function() {
	Quiz.count().success(function (count) {
		if (count===0) {
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma'
						})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});