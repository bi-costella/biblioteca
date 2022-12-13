const express = require('express');
const app = express();                 /* npm i --s ejs */

app.use(express.static(__dirname + '/views'));

app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const Alunos = require('./model/Alunos');
const Autores = require('./model/Autores');
const Editoras = require('./model/Editoras');
const Emprestimos = require('./model/Emprestimos');
const Livros = require('./model/Livros');


var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "bibliotecario",
  password: "1234",
  database: "biblioteca"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Banco de dados conectado!");
  });
  
  app.get('/inicio', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

/*Cadastro de Alunos*/
 
app.get('/alunos', function(req, res){
   
    var al = new Alunos();  
    al.listar(con, function(result){
        res.render('aluno/lista.ejs', {alunos: result});
    });
     
});
 
app.get('/formAluno', function(req, res){
    res.sendFile(__dirname + '/views/aluno/form.html');
});
 
app.post('/salvarAluno', function(req, res){
    try {
        var al = new Alunos();
       
        al.setNome(req.body.nome);
        al.setCpf(req.body.cpf);
        al.setRg(req.body.rg);
        al.setTelefoneAluno(req.body.telefonealuno);
        al.setEmailAluno(req.body.emailaluno);
        al.setCurso(req.body.curso);
        al.setIntCurso(req.body.intcurso);
        al.setFinCurso(req.body.fincurso);
        al.setEstado(req.body.estado);
        al.setCidade(req.body.cidade);
        al.setBairro(req.body.bairro);
        al.setLogradouro(req.body.logradouro);
        al.setNumCasa(req.body.numerocasa);
       
        var retorno = al.inserir(con);
        console.log('Aqui: ' + retorno);
    } catch (e) {
        console.log('Erro: '+e.message);
    }
    res.render('aluno/resultado.ejs', {param: al});
});

app.post('/filtrarAluno', function(req, res){
	var al = new Alunos();
	al.setNome(req.body.nome);
	
	if (al.getNome() == '') {
		al.setNome('%');
	}
	
	al.pesquisar(con, function(result){
		res.render('aluno/lista.ejs', {alunos: result});
	});
});
app.post('/excluirAluno', function(req, res){
	var al = new Alunos();
	al.setCpf(req.body.cpf);
	al.deletar(con);
	res.render('aluno/resultado.ejs', {param: al});
});

/*Cadastro de Autores*/

app.get('/autores', function(req, res){
	
	var a = new Autores();  
    a.listar(con, function(result){
		res.render('autor/lista.ejs', {autores: result});
	});
	  
});

app.get('/formAutores', function(req, res){
	res.sendFile(__dirname + '/views/autor/form.html');
});

app.post('/salvarAutor', function(req, res){
	try {
		var a = new Autores();

		a.setNomeAutor(req.body.nomeautor);
		a.setNacionalidade(req.body.nacionalidade);
		
		var retorno = a.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('autor/resultado.ejs', {param: a});
});

app.post('/filtrarAutor', function(req, res){
	var a = new Autores();
	a.setNomeAutor(req.body.nomeautor);
	
	if (a.getNomeAutor() == '') {
		a.setNomeAutor('%');
	}
	
	a.pesquisar(con, function(result){
		res.render('autor/lista.ejs', {autores: result});
	});
});

app.post('/excluirAutor', function(req, res){
	var a= new Autores();
	a.setIdAutores(req.body.idautores);
	a.deletar(con);
	res.render('autor/resultado.ejs', {param: a});
});

/*Cadastro de Editoras*/

app.get('/editoras', function(req, res){
	
	var e = new Editoras();  
    e.listar(con, function(result){
		res.render('editora/lista.ejs', {editoras: result});
	});
	  
});

app.get('/formEditoras', function(req, res){
	res.sendFile(__dirname + '/views/editora/form.html');
});


app.post('/salvarEditora', function(req, res){
	try {
		var e = new Editoras();
		
		e.setCnpj(req.body.cnpj);
		e.setRazaoSocial(req.body.razaosocial);
		e.setTelefoneEditora(req.body.telefoneeditora);
		e.setEmailEditora(req.body.emaileditora);
		
		var retorno = e.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('editora/resultado.ejs', {param: e});
});

app.post('/filtrarEditora', function(req, res){
	var e = new Editoras();
	e.setRazaoSocial(req.body.razaosocial);
	
	if (e.getRazaoSocial() == '') {
		e.setRazaoSocial('%');
	}
	
	e.pesquisar(con, function(result){
		res.render('editora/lista.ejs', {editoras: result});
	});
});

app.post('/excluirEditora', function(req, res){
	var e= new Editoras();
	e.setCnpj(req.body.cnpj);
	e.deletar(con);
	res.render('editora/resultado.ejs', {param: e});
});

/*Cadastro de Empréstimos*/

app.get('/emprestimos', function(req, res){
	
	var em = new Emprestimos();  
    em.listar(con, function(result){
		res.render('emprestimo/lista.ejs', {emprestimos: result});
	});	  
});

app.get('/formEmprestimos', function(req, res){
	res.sendFile(__dirname + '/views/emprestimo/form.html');
});

app.post('/salvarEmprestimo', function(req, res){
	try {
		var em = new Emprestimos();
		
		em.setUsuario(req.body.usuario);		
		em.setObraRetirada(req.body.obraretirada);
		em.setDataRetirada(req.body.dataretirada);
		em.setPrazoDevolucao(req.body.prazodevolucao);
		
		var retorno = em.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('emprestimo/resultado.ejs', {param: em});
});

app.post('/filtrarEmprestimo', function(req, res){
	var em = new Emprestimos();
	em.setUsuario(req.body.usuario);
	
	if (em.getUsuario() == '') {
		em.setUsuario('%');
	}
	
	em.pesquisar(con, function(result){
		res.render('emprestimo/lista.ejs', {emprestimos: result});
	});
});

app.post('/excluirEmprestimo', function(req, res){
	var em= new Emprestimos();
	em.setIdEmprestimos(req.body.idemprestimos);
	em.deletar(con);
	res.render('emprestimo/resultado.ejs', {param: em});
});

/*Cadastro de Livros*/

app.get('/livros', function(req, res){
	
	var li = new Livros();  
    li.listar(con, function(result){
		res.render('livro/lista.ejs', {livros: result});
	});
	  
});

app.get('/formLivros', function(req, res){
	res.sendFile(__dirname + '/views/livro/form.html');
});

app.post('/salvarLivro', function(req, res){
	try {
		var li = new Livros();
		
		li.setTituloObra(req.body.tituloobra);
		li.setIdioma(req.body.idioma);
		li.setClassificacao(req.body.classificacao);
		li.setAutorObra(req.body.autorobra);
		li.setEditora(req.body.editora);
		li.setTipoMidia(req.body.tipomidia);
		
		var retorno = li.inserir(con);
		console.log('Aqui: ' + retorno);
	} catch (e) {
		console.log('Erro: '+e.message);
	}
	res.render('livro/resultado.ejs', {param: li});
});

app.post('/filtrarLivro', function(req, res){
	var li = new Livros();
	li.setTituloObra(req.body.tituloobra);
	
	if (li.getTituloObra() == '') {
		li.setTituloObra('%');
	}
	
	li.pesquisar(con, function(result){
		res.render('livro/lista.ejs', {livros: result});
	});
});
/*
app.post('/filtrarLivro', function(req, res){
	var li = new Livros();
	li.setTituloObra(req.body.tituloobra);
	
	if (li.getTituloObra() == '') {
		li.setTituloObra('%');
	}
	
	li.pesquisar(con, function(result){
		res.render('views/index.ejs', {livros: result});
	});
});
*/
app.post('/excluirLivro', function(req, res){
	var li= new Livros();
	li.setIdLivros(req.body.idlivros);
	li.deletar(con);
	res.render('livro/resultado.ejs', {param: li});
});