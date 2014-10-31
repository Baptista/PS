use GameObserver
go


declare @nomep varchar(100) , @nomec varchar(100), @nteams int
set @nteams = 50
set @nomep = 'demojogador'
set @nomec = 'democlube'
while(@nteams>0)
begin
	exec dbo.createteam @nomeplayer=@nomep , @nomeclub = @nomec
	set @nomep = @nomep+'0'
	set @nomec = @nomec+'0'
	set @nteams = @nteams - 1
end





go

create proc createteam(@nomeplayer varchar(100) , @nomeclub varchar(100)) as
begin

declare @nomeclube varchar(100),@fundado date,@simbolo varchar(1000), @dataequipa date
set @nomeclube = 'democlub'
set @fundado = '1906/04/05'
set @simbolo = 'empty.jpg'
set @dataequipa = '2015/05/23'
insert into Clube values(@nomeclub,@fundado,@simbolo)
insert into Equipa values(@dataequipa ,(select id from Clube where nome=@nomeclub) , 1 )

declare @nome varchar(100),@nasceu date,@altura decimal(3,2),@foto varchar(1000),@peso int,@Arbitro int,@Jogador int
declare @ngk int, @ndefesas int, @nmedios int,@nataques int , @currpos int
set @nome = 'demoplayer'
set @nasceu = '1971/06/11'
set @altura = 1.75
set @foto = 'empty.jpg'
set @peso = 70
set @Arbitro = 0
set @Jogador = 1
declare @nplayers int
set @nplayers = 15;
set @ngk = 2;
set @ndefesas = 4
set @nmedios = 5
set @nataques = 4
while @nplayers>0
begin
	insert into Actor values(@nomeplayer,@nasceu,@altura,@foto,@peso,@Arbitro,@Jogador)
	insert into Jogador values(
		(select id from Actor where nome=@nomeplayer),
		(select id from Clube where nome=@nomeclub)
	)
	if(@ngk != 0)
	begin
		insert into jogar values(1,(select id from Actor where nome=@nomeplayer))
		insert into integrar values((select id from Actor where nome=@nomeplayer) , (select id from Clube where nome=@nomeclub) ,@dataequipa,1)
		set @ngk = @ngk - 1
	end
	else
	begin
		if(@ndefesas != 0)
		begin
			insert into jogar values(2,(select id from Actor where nome=@nomeplayer))
			insert into integrar values((select id from Actor where nome=@nomeplayer) , (select id from Clube where nome=@nomeclub) ,@dataequipa,2)
			set @ndefesas = @ndefesas - 1
		end
		else
		begin
			if(@nmedios != 0)
			begin
				insert into jogar values(3,(select id from Actor where nome=@nomeplayer))
				insert into integrar values((select id from Actor where nome=@nomeplayer) , (select id from Clube where nome=@nomeclub) ,@dataequipa,3)
				set @nmedios = @nmedios - 1
			end
			else
			begin
				if(@nataques != 0)
				begin
					insert into jogar values(4,(select id from Actor where nome=@nomeplayer))
					insert into integrar values((select id from Actor where nome=@nomeplayer) , (select id from Clube where nome=@nomeclub) ,@dataequipa,4)
					set @nataques = @nataques - 1
				end
			end
		end
	end

	set @nomeplayer = @nomeplayer +'1';
	set @nplayers = @nplayers - 1
end
end