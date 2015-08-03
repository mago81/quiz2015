var users = {
	admin: {id:1, username:"admin", password:"1234"},
	david:  {id:2, username:"david", password:"5678"}
};

//Comprueba si el usuario está registrado en users
//Si autenticación falla o hay errores se ejecuta callback(error)
exports.autenticar = function(login,password,callback) {
	if (users[login]){
		if (password=== users[login].password){
			callback(null,users[login]);
		} else { 
			callback(new Error('Password incorrecto'));
		}
	} else {
		callback(new Error('Usuario incorrecto.'));
	}
};