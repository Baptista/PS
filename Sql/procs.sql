use GameObserver

go



create proc InserirInstante
@minutosegundo datetime,
@idestadio int,
@datahora datetime,
@datavisitante date,
@idvisitante int,
@datadefronta date,
@iddefronta int,			
@idutilizador varchar(50),
@causou int,
@executou int,
@datahoraopiniao datetime,
@negativa int,
@idevento int
as
begin tran
	begin try
		insert into Instante values(@minutosegundo,@idestadio,@datahora,@datavisitante,@idvisitante,@datadefronta,@iddefronta,@idevento,
		@idutilizador,@causou,@executou)
		insert into Opiniao values(@datahoraopiniao,@negativa,@idutilizador,@idestadio,@minutosegundo,@datahora,@datavisitante,@idvisitante,
		@datadefronta,@iddefronta)
	end try
	begin catch
		rollback
	end catch
commit tran

go




create proc InserirOpiniao
@minutosegundo datetime,
@idestadio int,
@datahora datetime,
@datavisitante date,
@idvisitante int,
@datadefronta date,
@iddefronta int,			
@idutilizador varchar(50),
@datahoraopiniao datetime,
@negativa int
as
BEGIN
begin tran
	begin try 
		insert into Opiniao values(@datahoraopiniao,@negativa,@idutilizador,@idestadio,@minutosegundo,@datahora,@datavisitante,@idvisitante,
		@datadefronta,@iddefronta)
	end try
	begin catch
		rollback
	end catch
commit tran
END


go



go
create proc InserirPartida
@idestadio int,
@datahora datetime,
@primeiroarbitro int,
@segundoarbitro int,
@terceiroarbitro int,
@quatroarbitro int,
@idvisitante int,
@datavisitante datetime,
@iddefronta int,
@datadefronta datetime
as
begin tran
	begin try
		insert into Partida values(@idestadio,@datahora,@primeiroarbitro,@segundoarbitro,@terceiroarbitro,@quatroarbitro,
									@datavisitante,@idvisitante,@datadefronta,@iddefronta)
	end try
	begin catch
		rollback
	end catch
commit tran




go
create proc InserirEquipa
@idformacao int,
@idclube int,
@date date
as
begin tran
	begin try
		insert into Equipa values(@date,@idclube,@idformacao)
	end try
	begin catch
		rollback
	end catch
commit tran


go

create proc InserirJogadorNaEquipa
@idjogador int,
@idclube int,
@dataequipa date,
@idposicao int
as
begin tran
	begin try
		insert into integrar values(@idjogador, @idclube, @dataequipa, @idposicao)
	end try
	begin catch
		rollback
	end catch
commit tran	

go

create proc UpdateJogadorNaEquipa
@idjogador int,
@idclube int,
@dataequipa date,
@idposicao int
as
begin tran
	begin try
		update integrar set idposicao=@idposicao where idjogador=@idjogador and idclube=@idclube and dataequipa=@dataequipa
	end try
	begin catch
		rollback
	end catch
commit tran	





