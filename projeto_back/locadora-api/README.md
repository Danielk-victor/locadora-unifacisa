----    1    ------
Confirme que a aplicação está rodando
No IntelliJ, o console deve mostrar algo como 'Started LocadoraApiApplication' e não deve ter fechado. Enquanto essa janela estiver aberta e rodando, a API está no ar.
----    2    ------
Abra o navegador para ver os filmes
Digite na barra de endereço: http://localhost:8080/api/filmes e aperte Enter. Vai aparecer uma lista em JSON com todos os filmes que você cadastrou.
----    3    ------
Veja um filme específico pelo ID
Troque o número no final da URL pelo ID do filme que quer ver, por exemplo: http://localhost:8080/api/filmes/1 (o 1 é o ID, geralmente o primeiro cadastrado).
----    4    ------
Faça o mesmo para os jogos
É a mesma lógica, só trocando 'filmes' por 'jogos' na URL: http://localhost:8080/api/jogos para ver todos, ou http://localhost:8080/api/jogos/1 para ver um específico.
----    5    ------
Use o Postman para criar, editar ou apagar
O navegador só mostra dados (GET). Para criar (POST), atualizar (PUT) ou remover (DELETE) filmes e jogos, continue usando o Postman como você já fez, trocando o método e a URL conforme a tabela de endpoints que te passei antes.
----    6    ------
Trabalho feito com auxilio de IA e por Daniel Victor Bezerra Matias de Freitas.