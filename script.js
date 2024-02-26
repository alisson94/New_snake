let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = 800
canvas.height = 600

let gameOver = false
let pontos = 0

class Snake{
    constructor(){
        this.velocidade = 2
        this.tamanho = 20
        this.corpo = []
        this.adicionar = false
        
        for (let i = 0; i < 3; i++) {
            this.corpo.push({
                x: 100 - i*this.tamanho,
                y: 100,
                direcao: "direita",
                proxima_direcao: 'direita'
            })
            
        }
    }
    mover() {
        
    }
    aumentar(){
        this.adicionar = true
        pontos += 10
    }
    desenhar(){
        this.corpo.forEach((pedaco,i) => {
            let cor = 0 + (60-0)/(this.corpo.length + 5) * i
            ctx.fillStyle = `hsl(${cor}, 100%, 50%)`
            ctx.fillRect(pedaco.x, pedaco.y, snake.tamanho, snake.tamanho)
        });
        
    }
    atualizar(){
        this.desenhar()

        //ADICIONAR PEDACOS MUDAR DIRECAO DOS PEDACOS
        if(this.corpo[0].x % this.tamanho == 0 && this.corpo[0].y % this.tamanho ==0){
            console.log('virou')
            
            for (let i = this.corpo.length - 1; i > 0 ; i--) {
                this.corpo[i].direcao = this.corpo[i-1].direcao;
                
            }
            
            this.corpo[0].direcao = this.corpo[0].proxima_direcao 

            if(this.adicionar){
                this.corpo.push({
                    x: this.corpo[this.corpo.length-1].x,
                    y: this.corpo[this.corpo.length-1].y,
                    direcao: ''
                })
                this.adicionar = false
            }
        }

        //VERIFICA COLISAO COM PAREDES
        if(this.corpo[0].x + this.tamanho > canvas.width || this.corpo[0].x < 0 || this.corpo[0].y + this.tamanho > canvas.height || this.corpo[0].y < 0){
            gameOver = true
        }

        this.corpo.forEach(pedaco => {

            if(pedaco != this.corpo[0]){
                
                let cabeca = this.corpo[0]

                switch (cabeca.direcao) {
                    case "direita":
                        if(cabeca.x + this.tamanho > pedaco.x && cabeca.x < pedaco.x && cabeca.y == pedaco.y){
                            gameOver = true
                        } 

                        break;
                    case "esquerda":
                        if(cabeca.x > pedaco.x && cabeca.x < pedaco.x + this.tamanho && cabeca.y == pedaco.y){
                            gameOver = true
                        }   
                    
                    break;
                    case "cima":
                        if(cabeca.y > pedaco.y && cabeca.y < pedaco.y + this.tamanho && cabeca.x == pedaco.x){
                            gameOver = true
                        }   
    
                    break;
                    case "baixo":
                        if(cabeca.y + this.tamanho > pedaco.y && cabeca.y < pedaco.y && cabeca.x == pedaco.x){
                            gameOver = true
                        }   
                    
                    break;
                    default:
                        break;
                }

            }

            switch (pedaco.direcao) {
                case "direita":
                    pedaco.x += this.velocidade    

                    break;
                case "esquerda":
                    pedaco.x -= this.velocidade    
                
                break;
                case "cima":
                    pedaco.y -= this.velocidade    

                break;
                case "baixo":
                    pedaco.y += this.velocidade    
                
                break;
                default:
                    break;
            }
        });



    }
}

class Comida{
    constructor({posicao}){
        this.posicao = {
            x: posicao.x,
            y: posicao.y
        }
    }

    desenhar(){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.posicao.x, this.posicao.y, snake.tamanho, snake.tamanho)
    }
    atualizar(){
        this.desenhar()

    }
}

class Jogo{
    desenharFundo(){
        for (let i = 0; i < canvas.width/snake.tamanho; i++) {
            for (let j = 0; j < canvas.height/snake.tamanho; j++) {
                ctx.fillStyle = (i+j)%2 == 0 ? '#00FF7F' : '#3CB371';
                ctx.fillRect(i*snake.tamanho, j*snake.tamanho, snake.tamanho, snake.tamanho)
                
                
            }
            
        }
    }
}

let comidas = []
const snake = new Snake()
const jogo = new Jogo();

function gerarComida() {
    let comidaX = Math.floor(Math.random() * canvas.width/snake.tamanho) * snake.tamanho
    let comidaY = Math.floor(Math.random() * canvas.height/snake.tamanho) * snake.tamanho

    for (const parte of snake.corpo) {
        if(parte.x == comidaX && parte.y == comidaY){
            gerarComida()
        }
    }

    const comida = new Comida({
        posicao:{
            x: comidaX,
            y: comidaY
        }

    })
    comidas.push(comida)
}

function gui(){
    ctx.font = '45px Pixelify Sans'
    ctx.textAlign = 'left'
    ctx.fillStyle = 'white'
    ctx.fillText('Pontos: ' + pontos, 10, 50)
    ctx.strokeText('Pontos: ' + pontos, 10, 50)

}

gerarComida() 
jogo.desenharFundo()

//loop()
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    jogo.desenharFundo()

    snake.atualizar()

    comidas.forEach((comida, i)=>{
        comida.atualizar()

        if(comida.posicao.x == snake.corpo[0].x && comida.posicao.y == snake.corpo[0].y){
            comidas.splice(i, 1)
            gerarComida()
            snake.aumentar()
        }
    })

    gui()

    if(gameOver){
        console.log('game over')
    }else{
        window.requestAnimationFrame(loop)

    }

}