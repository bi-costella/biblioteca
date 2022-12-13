module.exports = class Livros {

    constructor() {
        this.idlivros = 0;
        this.tituloobra = "";
        this.idioma = "";
        this.classificacao = "";
        this.autorobra = "";
        this.editora = "";
        this.tipomidia = "";
    }

    
    setIdLivros(i) {
        this.idlivros = i;
    }
            
    getIdLivros() {
        return this.idlivros;  
    }


    setTituloObra(to) {
        this.tituloobra = to;
    }
            
    getTituloObra() {
        return this.tituloobra;  
    }

    setIdioma(i) {
        this.idioma = i;
    }
            
    getIdioma() {
        return this.idioma;  
    }

    setClassificacao(c) {
        this.classificacao = c;
    }
    
            
    getClassificacao() {
        if (this.classificacao =="t1"){
            return 'Livros científicos'
        } else {
            if (this.classificacao =="t2"){
                return 'Periódicos informativos'
            } else {
                if (this.classificacao =="t3") {
                    return 'Periódicos de entretenimento'
                } else { 
                    if (this.classificacao =="t4") {
                        return 'Livros de literatura'
                    } else {
                        if (this.classificacao =="t5") {
                            return 'Outro'
                    }
                } 
            }
        }
    }
}
    setAutorObra(ao) {
        this.autorobra = ao;
    }
            
    getAutorObra() {
        return this.autorobra;  
    }

    setEditora(e) {
        this.editora = e;
    }
            
    getEditora() {
        return this.editora;  
    }

    setTipoMidia(tm) {
        this.tipomidia = tm;
    }
            
    getTipoMidia() {
        if (this.tipomidia =="m1"){
            return 'Impressa'
        } else {
            if (this.tipomidia =="m2"){
                return 'DVD'
            } else {
                if (this.tipomidia =="m3") {
                    return 'CD'
                } else { 
                    if (this.tipomidia =="m4") {
                        return 'Online'
                    } else {
                        if (this.tipomidia =="m5") {
                            return 'Outro'
                    }
                } 
            }
        }
    }
}

    
    inserir(connection) {
        try {
            var sql = "INSERT INTO livros (tituloobra,idioma,classificacao,autorobra,editora,tipomidia) VALUES( ?, ?, ?, ?, ?, ?)";
            connection.query(sql, [this.tituloobra, this.idioma, this.classificacao, this.autorobra, this.editora, this.tipomidia], function (err, result) {
                //if (err) throw "teste";
                if (err) throw 'err from callback: ' + err.stack;
                });
            } 
              catch (e) {
                console.error('err from callback: ' + e.stack);
                throw e;
            }
      }

   listar(connection, callback) {
        var sql = "SELECT * FROM livros";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                return callback(result);
        });    
    }

    pesquisar(connection, callback) {
        var sql = "SELECT * FROM livros WHERE tituloobra like ?";
    
        connection.query(sql, [this.tituloobra], function (err, result) {
            if (err) throw err;
            return callback(result);
        });    
    }
    deletar(connection) {
        var sql = "DELETE FROM livros WHERE idlivros =  ?";
    
        connection.query(sql, [this.idlivros], function (err, result) {
          if (err) throw "teste";
          //if (err) console.error('err from callback: ' + err.stack);
        });
      }

}