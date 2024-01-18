//Dados iniciais
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}

// variavel que recebera o valor x ou o
let player = '';

//variavel que receberá as mensagens de resultado
let warning= '';

//variavel que possibilitará ou nao a jogada do proximo jogador
let playing = false;

//chama a função responsavel por dar um reset
reset();

//Eventos
//localiza o botao reset e adiciona a ele uma funçao de reset
document.querySelector('.reset').addEventListener('click', reset);

//localiza todos os campos clicaveis para inserção do x ou o
document.querySelectorAll('.item').forEach(item =>{
    //adiciona um evento de click, chamando a função click para cada parte clicavel
    item.addEventListener('click',itemClick);
})

//uma forma nove vezes para cada um document.querySelector('div[date-item=a1]').addEventListener('click',itemclick);
//Funções
function itemClick(event){
    let item = event.target.getAttribute('data-item');

    if(playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

function reset(){
    warning = '';

    //variavel que sorteia um valor entre 0 ou 1 e arredonda pra baixo para definir o proximo jogador
    let random = Math.floor(Math.random()*2);

    //variavel que armazena o jogador a jogar o x ou o bolinha
    player = (random === 0) ? player = 'x': player = 'o';

    //loop que preenche todo o array com vazio, ou seja limpa todo array
    for(let i in square){
        square[i] = '';
    }

    //variavel que possibilida a jogar
    playing = true;

    //função que renderiza as informações do array na tela
    renderSquare();

    //função que renderiza as informações de resultado e quem sera o proximo jogador
    renderInfo();
}

//função que renderiza e preenche o array
function renderSquare(){
    //loop que roda todo o array para preencher
    for (let i in square){

        //variavel que localiza o campo a ser prenchido pelo o item
        let item = document.querySelector(`div[data-item=${i}]`)

        //x ou bolinha que vai ser inserido na tela
        item.innerHTML = square [i];
    }

    //chama a função que verifica se ja possui um ganhador
    checkGame();
}

//função responsavel por redenrizar na tela
function renderInfo(){

    //localiza o campo responsavel por mostrar o proximo jogador
    document.querySelector('.vez').innerHTML = player;

    //localiza o campo de resultado para mostrar o resultado da partida
    document.querySelector('.resultado').innerHTML = warning;
}

//função por ficar reverzando entre jogador da Bolinha ou do X
function togglePlayer(){
    //verifica se o player é o x, se sim muda pra o bolinha, se nao coloca o x
    player = (player === 'x') ? 'o' : 'x';
    //chama a função render responsavel por mostrar alteração na tela
    renderInfo();
}

//função responsavel por verificar quem foi o ganhador
function checkGame(){
    //verifica se o x foi ganhador enviando como parametro o x para função de verificação
    if(checkWinnerFor('x')){
        //escreve no campo de aviso que o x venceu
        warning = 'O "x" venceu';
        //muda para false a possibilidade de outra jogada
        playing = false;
    }else if(checkWinnerFor('o')){ // verifica se o bolinha foi o campeão
        warning = 'O "o" venceu'
        playing = false;
    }else if(isFull()){ // verifica se houve um empate pela função de empate
        warning = 'Deu empate';
        playing = false;
    }
}

//função que recebe o X ou bolinha para determinar quem ganhou
function checkWinnerFor(player){
   
    //array que armazena as possiveis formas de ganhar (sendo 8 possiveis)
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    //loop que verifica se atende a necessidade para concluir
    for(let w in pos){
        let pArray = pos[w].split(','); // a1, a2, a3

        console.log(pArray);
        //variavel que retorna se alguma das opção atende a possibilidade de ganhar se tiver todas atendendo
        let hasWon = pArray.every(option => square[option] === player
        );
       
        //se atender a algumas da possibilidade retorna true
        if(hasWon){
            return true;
        }

    }
    // enquanto nao for vencido retorna false
    return false;
}

//função que verifica o empate
function isFull(){

    //loop que roda todo para verificar se o array esta vazio
    for(let i in square){
        //se o array estiver vazio retorna falso, nao deu empate
        if(square[i]===''){
            return false;
        }
    }

    //se for empate ele retorna true
    return true;
}