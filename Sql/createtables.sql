use GameObserver

go

create table Nacionalidade(
	id int not null identity(1,1) primary key,
	designacao varchar(50) not null
)



create table Actor(
	id int primary key identity(1,1),
	nome varchar(25) not null,
	nasceu date not null,
	altura decimal(3,2) not null,
	foto varchar(1000) not null,
	peso int not null,
	Arbitro int not null,
	Jogador int not null
)

create table possuir(
	idnac int not null references Nacionalidade(id),
	idactor int references Actor(id),
	constraint pk_possuir primary key(idnac,idactor)
)

create table Arbitro(
	id int not null primary key references Actor(id)
)


create table Clube(
	id int primary key identity(1,1),
	nome varchar(100) not null,
	fundado date not null,
	simbolo varchar(1000) not null
)


create table Jogador(
	id int not null primary key references Actor(id),
	idclub int foreign key references Clube(id)
)

create table Posicao(
	id int not null primary key identity(1,1),
	designação varchar(20) not null
)
create table jogar(
	idpos int not null foreign key references Posicao(id),
	idjog int foreign key references Jogador(id),
	constraint pk_jogar primary key(idpos , idjog)
)


create table Formacao(
	id int primary key identity(1,1),
	designacao varchar(10) not null
)

create table Equipa(
	data date not null,
	id int not null foreign key references Clube(id),
	idformacao int not null references Formacao(id),	
	constraint pk_equipa Primary Key(id,data)
)

create table integrar(
	idjogador int not null foreign key references Jogador(id),
	idclube int,
	dataequipa date,
	idposicao int foreign key references Posicao(id),
	constraint fk_conter foreign key (idclube,dataequipa) references Equipa(id,data),
	constraint pk_conter primary key(idjogador,idclube,dataequipa)
)

create table Estadio(
	id int not null primary key identity(1,1),
	morada varchar(100)not null,
	nome varchar(50) not null,
	lotacao int not null
)

create table pertencer(
	idestadio int references Estadio(id),
	idclube int references Clube(id),
	constraint pk_pertencer primary key(idestadio,idclube)
)

create table Partida(
	idestadio int not null references Estadio(id),
	datahora datetime not null,
	primeiroarbitro int not null foreign key references Arbitro(id),
	segundoarbitro int not null foreign key references Arbitro(id),
	terceiroarbitro int not null foreign key references Arbitro(id),
	quartoarbitro int not null foreign key references Arbitro(id),
	datavisitante date not null,
	idvisitante int not null,
	datadefronta date not null,
	iddefronta int not null,
	constraint fk_visitante foreign key(idvisitante,datavisitante) references Equipa(id,data),
	constraint fk_visitado foreign key(iddefronta,datadefronta) references Equipa(id,data),
	constraint pk_partida primary key(idestadio,datahora,idvisitante,datavisitante,iddefronta,datadefronta)
)

create table Evento(
	id int not null primary key identity(1,1),
	icone varchar(100),
	tipo varchar(30)not null
)

create table Instante(
	minutosegundo datetime not null,
	idestadio int not null,
	datahora datetime not null,
	datavisitante date not null,
	idvisitante int not null,
	datadefronta date not null,
	iddefronta int not null ,
	idevento int not null foreign key references Evento(id),	
	idutilizador varchar(50) not null,
	causou int not null foreign key references Actor(id),
	executou int foreign key references Actor(id),
	constraint fk_instante foreign key(idestadio,datahora,idvisitante,datavisitante,iddefronta,datadefronta) references Partida(idestadio,datahora,idvisitante,datavisitante,iddefronta,datadefronta),
	constraint pk_instante primary key(idestadio ,minutosegundo, datahora ,idvisitante,datavisitante,iddefronta,datadefronta)
							  
)

create table Opiniao(
	datahoraopiniao datetime not null,	
	negativa int not null,
	idutilizador varchar(100) not null,
	
	idestadio int not null,
	minutosegundoinstante datetime not null,
	datahora datetime not null,
	datavisitante date not null,
	idvisitante int not null,
	datadefronta date not null,
	iddefronta int not null,
	
	constraint fk_opiniao foreign key (idestadio,minutosegundoinstante,datahora,idvisitante,datavisitante,iddefronta,datadefronta)references Instante(idestadio,minutosegundo, datahora ,idvisitante,datavisitante,iddefronta,datadefronta),
	constraint pk_opiniao primary key (idutilizador,datahoraopiniao)
)



create table Canto(
	id int not null primary key references Evento(id)
)
create table Falta(
	id int not null primary key references Evento(id)
)
create table Penalty(
	id int not null primary key references Evento(id)
)
create table Golo(
	id int not null primary key references Evento(id)
)
create table ForadeJogo(
	id int not null primary key references Evento(id)
)
create table CartaoAmarelo(
	id int not null primary key references Evento(id)
)
create table CartaoVermelho(
	id int not null primary key references Evento(id)
)
create table IniciodaPartida(
	id int not null primary key references Evento(id)
)
create table FimdaPartida(
	id int not null primary key references Evento(id)
)

