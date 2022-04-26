//Pegando o canvas do html e definindo um ctx;
let canvas = document.getElementById("my_Canvas");
let ctx = canvas.getContext("2d");


//#############################################################################################################
//#############################################################################################################
//Adicionando evento para pegar os valores das teclas pressionadas;


document.addEventListener('keydown',pressionar);
document.addEventListener('keyup',soltar); /*Ao add um evento, precisa-se informar o tipo de evento
---------------------------------------------------- e qual função ele deve chamar após ocorrer o evento; */

let keys = []; /*para salvar que um tecla foi precionada, é necessário criar um vetor para adicionar essa tecla lá
--------------então criei o vetor "keys"*/

//pressinar(e) e soltar(e) são as funções que serão chamadas após os eventos "keydown" e "keyup" forem chamados;
function pressionar(e) {
	keys[e.key] = true; //Achei muito estranho, mas é assim que funfa - o que está escrito siginifca que ele irá acrescentar a tecla que pegou à lista
}

function soltar(e){
	delete keys[e.key]; //Após soltar a tecla ele apaga ela da lista
}

//#############################################################################################################
//-------------------------------------------------------------------------------------------------------------
//#############################################################################################################
//-------------------------------------------------------------------------------------------------------------
//#############################################################################################################
// Função resposanvel por contabilizar o número de vidas:

//Criando variáveis para que seja possível adicionar as informações de vida no html
let vidas_restantes = document.getElementById('vidas'); //Cria a variável como o texto da tag de id vidas
let num_vidas = 5 //Define com 5 o número inicial de vidas!!!!
vidas_restantes.innerText = num_vidas.toString() //Adiciona pela primeira vez no html o valor das vidas, o qual começa no 5!

function vidas(){
	if (num_vidas != 0)
	{
		x_arroz = 300;//retorna o bolinho de arroz para a posição inicial
		y_arroz=300;//retorna o bolinho de arroz para a posição inicial
	}
	else
	{
		location.reload(); //Para dar reload na página após perder o jogo;
		alert("Game over");//fim de jogo
	}
}

//#############################################################################################################
//#############################################################################################################
//Função para movimentar o jogador 1 (w,a,s,d):


//Aqui adicionei a imagem do arroz;
let arroz = new Image(); arroz.src= 'arrozin.png'; let arroz_speed=8; let x_arroz = (canvas.width/2); let y_arroz=(canvas.height/2);

function j1_move(){
		/*Condições para ver se uma tecla está sendo pressionada (ele verifica se a tecla está dentro do vetor
			"keys" e então executa a função*/
	if ( 'w' in keys ){
		y_arroz -= arroz_speed;
	}
	if ( 's' in keys ){
		y_arroz += arroz_speed;
	}
	if ( 'd' in keys ){
		x_arroz += arroz_speed;
	}
	if ( 'a' in keys ){
		x_arroz -= arroz_speed;
	}
	
	/*Delimitação de espaço do personagem dentro do canvas - 4 delimitações para 4 lados*/
	/* Utiliza-se como referencial a largura e comprimento do Canvas, a partir disso o eixo x ou y assumirá seu valor decrementado*/
	/*Lateral direita*/
	if (x_arroz-40 >= (canvas.width - 80)){
        //x_arroz = canvas.width - 80;
		num_vidas -=1;//Contabiliza o número de vidas que foram perdidas ao escostar na parede
		vidas()
		vidas_restantes.innerText = num_vidas.toString()//Atualiza no HTML o valor do número de vidas
		console.log(num_vidas);
    }

	/*Lateral esquerda*/
	if (x_arroz <= (40)){
		//x_arroz = 40;
		num_vidas -=1;//Contabiliza o número de vidas que foram perdidas ao escostar na parede
		vidas()
		vidas_restantes.innerText = num_vidas.toString()//Atualiza no HTML o valor do número de vidas
		console.log(num_vidas);
		
	}

	/*Inferior*/
	if (y_arroz-40 >= (canvas.height - 80)){
		//y_arroz = canvas.height - 80;
		num_vidas -=1;//Contabiliza o número de vidas que foram perdidas ao escostar na parede
		vidas()
		vidas_restantes.innerText = num_vidas.toString() //Atualiza no HTML o valor do número de vidas
		console.log(num_vidas);
		
   	}
   
	/*Superior*/
   	if (y_arroz <= (40)){
		//y_arroz = 40;
		num_vidas -=1;//Contabiliza o número de vidas que foram perdidas ao escostar na parede
		vidas()
		vidas_restantes.innerText = num_vidas.toString()//Atualiza no HTML o valor do número de vidas
		console.log(num_vidas);
	}

	

	ctx.beginPath(); //Para indicar o começo
	ctx.drawImage(arroz, x_arroz, y_arroz, 80, 80); //Para desenhar o arroz de acordo com suas novas posições
	
}

//#############################################################################################################
//#############################################################################################################
//Comidinhas do arroizin

//Função para gerar um valor aleatório para depois associar ao x e y;
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

//São os elementos da comida! - valores x e y iniciais e fonte da imagem
let x_comida = getRandomInt(canvas.width-60)+30; //Defini um valor inicial aleatório para x
let y_comida = getRandomInt(canvas.height-50)+25;//Defini um valor inicial aleatório para y
let comida = new Image(); comida.src = "comidinha.jpeg";

//Criando variáveis para que seja possível adicionar as informações de pontuação no html
let pontuacao = document.getElementById('pontos'); //Cria a variável como o texto da tag de id pontos
let pontos = 0; //Cria a variável pontos, para que seja feita a contagem

pontuacao.innerText = pontos //Adiciona pela primeira vez no html o valor da pontuação, o qual começa no 0!


function comidinha(){
	
	//Verificar a colisão - foram definidos 4 pontos da comida, pontos esses que são os cantos do quadrado que forma a imagem;
	//Ele verifica se os "pontos" da comida entraram na área do arroizin
	//Para isso o "x" e o "y" da comida precisa estar dentro desses requisitos:
	if ( (x_comida >= x_arroz)  &&
		(x_comida <= x_arroz+80)  &&
		(y_comida >= y_arroz) &&
		(y_comida <= y_arroz+80) ){
		
		pontos += 1; //A pontuação aumenta em 1 ponto!
		
		pontuacao.innerText = pontos //Atualiza no HTML a pontuação!
		
		x_comida = getRandomInt(canvas.width-60) + 30; //É definido um novo "x"
		y_comida = getRandomInt(canvas.height-50) + 25; //É definido um novo "y"
	}
	
	
	ctx.beginPath(); //Inicio do desenho
	ctx.drawImage(comida, x_comida, y_comida, 30,25); //Desenha a comida
	
	
}

//#############################################################################################################
//#############################################################################################################
//Comidinha especial!

let c_especial = new Image(); c_especial.src = 'c_especial.jpeg'; 
let contador_especial = 0; 
let x_cEspecial = getRandomInt(canvas.width-60) + 30; let y_cEspecial = getRandomInt(canvas.height-50) + 25;


function cespecial(){
	let atualizador = getRandomInt(20);
	
	if (atualizador === 1 && contador_especial<30) {
		contador_especial += 1;
	}
	
	if (contador_especial===30){
		ctx.beginPath();
		ctx.drawImage(c_especial , x_cEspecial , y_cEspecial , 30,25);
		
		if ( (x_cEspecial >= x_arroz) &&
			(x_cEspecial <= x_arroz+80) &&
			(y_cEspecial >= y_arroz) &&
			(y_cEspecial <= y_arroz+80) ){
			
			contador_especial=0;
			
			pontos += 5;
			pontuacao.innerText = pontos //Atualiza no HTML a pontuação!
			
			x_cEspecial = getRandomInt(canvas.width);
			y_cEspecial = getRandomInt(canvas.height);
		};
	};
	
	
};






//#############################################################################################################
//-------------------------------------------------------------------------------------------------------------
//#############################################################################################################
//-------------------------------------------------------------------------------------------------------------
//#############################################################################################################
//Função principal:


function main(){
	requestAnimationFrame(main); //Para pedir que o site chame novamente essa função toda vez que atualizar
	ctx.beginPath(); ctx.clearRect(0, 0, canvas.width, canvas.height);//Limpa o canvas para a proxima animação
	comidinha(); //Chama a função de desenhar a comida
	cespecial();
	j1_move(); //chamando a função do jogador1 (arroz)
	
}

main(); //Chamando a função principal.

