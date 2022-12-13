CREATE DATABASE biblioteca;

use biblioteca;

create table alunos(
   nome VARCHAR(45) NOT NULL,
   cpf VARCHAR(45) NOT NULL,  
   rg VARCHAR(20) NOT NULL, 
   telefonealuno VARCHAR(13) NOT NULL,  
   emailaluno VARCHAR(50) NOT NULL,   
   curso VARCHAR(45) NOT NULL,
   intcurso VARCHAR(45) NOT NULL,
   fincurso DATE NOT NULL,   
   estado VARCHAR(30) NOT NULL,   
   cidade VARCHAR(30) NOT NULL,
   bairro VARCHAR(20) NOT NULL,
   logradouro VARCHAR(30) NOT NULL,
   numerocasa VARCHAR(7) NOT NULL,
   PRIMARY KEY (cpf)
);

create table autores (
   idautores INT NOT NULL AUTO_INCREMENT,
   nomeautor VARCHAR(20) NOT NULL,
   nacionalidade VARCHAR(20) NOT NULL,
   PRIMARY KEY (idautores)
);

create table editoras (
   cnpj VARCHAR(14) NOT NULL,
   razaosocial VARCHAR(30) NOT NULL,
   telefoneeditora VARCHAR(13) NOT NULL,
   emaileditora VARCHAR(30) NOT NULL,
   PRIMARY KEY (cnpj)
);

create table emprestimos (
   idemprestimos INT NOT NULL AUTO_INCREMENT,
   usuario VARCHAR(45) NOT NULL,
   obraretirada VARCHAR(45) NOT NULL,
   dataretirada DATE NOT NULL,
   prazodevolucao DATE NOT NULL,
   PRIMARY KEY (idemprestimos)
);

create table livros (
   idlivros INT NOT NULL AUTO_INCREMENT,
   tituloobra VARCHAR(50) NOT NULL,
   idioma VARCHAR(45) NOT NULL,
   classificacao VARCHAR(45) NOT NULL,
   autorobra VARCHAR(20) NOT NULL,
   editora VARCHAR(20) NOT NULL,
   tipomidia VARCHAR(45) NOT NULL,
   PRIMARY KEY(idlivros)
);


CREATE USER 'bibliotecario'@'localhost' IDENTIFIED BY '1234';

GRANT ALL PRIVILEGES ON *.* TO 'bibliotecario'@'localhost';

FLUSH PRIVILEGES;

