//GET /quizes/question
/*exports.question = function(req,res){
	res.render('quizes/question',{pregunta:'Capital de Italia'});
};

//GET /quizes/answer
exports.answer = function(req,res){
	if (req.query.respuesta ==='Roma'){
		res.render('quizes/answer',{respuesta:'Correcto.'});
	} else {
		res.render('quizes/answer',{respuesta:'Incorrecto.'});
	}
};*/

var models = require('../models/models.js');

/*exports.question = function(req,res){
	models.Quiz.findAll().success(function(quiz){
	  res.render('quizes/question',{pregunta:quiz[0].pregunta});	
	})
	
};

//GET /quizes/answer
exports.answer = function(req,res){
	models.Quiz.findAll().success(function(quiz){
	  if (req.query.respuesta ===quiz[0].respuesta){
	  	res.render('quizes/answer',{respuesta:'Correcto.'});
	  } else {
		res.render('quizes/answer',{respuesta:'Incorrecto.'});
	  }
	})
};*/
//autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req,res,next,quizId){
	models.Quiz.find(quizId).then(function(quiz){
		if (quiz) {
			req.quiz = quiz;
			next();
		} else {
			next(new Error('No existe quizId='+quizId));
		}
	}).catch(function(error) { next(error);});
};


//GET /quizes
exports.index = function(req,res){
	var busqueda= null;
	if (req.query.search){
		busqueda = ('%'+req.query.search+'%').replace(/ /g,'%');
		models.Quiz.findAll({where:["pregunta like ?",busqueda],order:'pregunta ASC'}).then(function(quizes){
	      res.render('quizes/index',{quizes: quizes});	
	    })
	} else {
		models.Quiz.findAll().then(function(quizes){
	  		res.render('quizes/index',{quizes: quizes});	
		})
	}
	
};

exports.show = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
	  res.render('quizes/show',{quiz: req.quiz});	
	})
	
};

//GET /quizes/answer
exports.answer = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
	  if (req.query.respuesta ===req.quiz.respuesta){
	  	res.render('quizes/answer',{quiz: req.quiz, respuesta:'Correcto.'});
	  } else {
		res.render('quizes/answer',{quiz: req.quiz, respuesta:'Incorrecto.'});
	  }
	})
};

//GET /quizes/new
exports.new = function(req,res){
	var quiz = models.Quiz.build(
		{pregunta:"pregunta", respuesta: "respuesta"}
	);
	res.render('quizes/new',{quiz:quiz});
};

//POST /quizes/create
exports.create = function(req,res){
	var quiz = models.Quiz.build(req.body.quiz);
	console.log(quiz);

	quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
		res.redirect('/quizes');
	})
};


