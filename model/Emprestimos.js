module.exports = class Emprestimos {

    constructor() {
        this.idemprestimos = 0;
        this.usuario = "";
        this.obraretirada = "";
        this.dataretirada = "";
        this.prazodevolucao = "";
    }

    setIdEmprestimos(i) {
        this.idemprestimos = i;
    }
            
    getIdEmprestimos() {
        return this.idemprestimos;  
    }

    setUsuario(x) {
        this.usuario = x;
    }
            
    getUsuario() {
        return this.usuario;  
    }

    setObraRetirada(x) {
        this.obraretirada = x;
    }
            
    getObraRetirada() {
        return this.obraretirada;  
    }

    setDataRetirada(x) {
        this.dataretirada = x;
    }
            
    getDataRetirada() {
        return this.dataretirada;  
    }

    setPrazoDevolucao(x) {
        this.prazodevolucao = x;
    }
            
    getPrazoDevolucao() {
        return this.prazodevolucao;  
    }

    inserir(connection) {
        try {
            var sql = "INSERT INTO emprestimos (usuario,obraretirada,dataretirada,prazodevolucao) VALUES(?, ?, ?, ?)";
            connection.query(sql, [this.usuario,this.obraretirada,this.dataretirada,this.prazodevolucao], function (err, result) {
                if (err) throw "teste";
                //if (err) console.error('err from callback: ' + err.stack);
                });
            } 
              catch (e) {
                console.error('err from callback: ' + e.stack);
                throw e;
            }
      }

    listar(connection, callback) {
    var sql = "SELECT * FROM emprestimos";

    connection.query(sql, function (err, result) {
		if (err) throw err;
		return callback(result);
    });    
  }

  pesquisar(connection, callback) {
    var sql = "SELECT * FROM emprestimos WHERE usuario like ?";

    connection.query(sql, [this.usuario], function (err, result) {
        if (err) throw err;
        return callback(result);
    });    
}
deletar(connection) {
	var sql = "DELETE FROM emprestimos WHERE idemprestimos =  ?";

	connection.query(sql, [this.idemprestimos], function (err, result) {
	  if (err) throw "teste";
	  //if (err) console.error('err from callback: ' + err.stack);
    });
  }

}