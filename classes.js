class Snake{
    constructor(){
        this.velocidade = 3
        this.tamanho = 30
        this.corpo = []
        this.adicionar = false
        
        for (let i = 0; i < 3; i++) {
            this.corpo.push({
                x: 90 - i*this.tamanho,
                y: 90,
                direcao: "direita",
                proxima_direcao: 'direita'
            })
            
        }
    }
    aumentar(){
        this.adicionar = true
        pontos += 10
    }
    desenhar(){
        this.corpo.forEach((pedaco,i) => {
            let cor = 289 + (308-289)/(this.corpo.length + 5) * i
            ctx.fillStyle = `hsl(${cor}, 100%, 50%)`
            ctx.fillRect(pedaco.x, pedaco.y, snake.tamanho, snake.tamanho)
        });
        
    }
    atualizar(){
        this.desenhar()

        //ADICIONAR PEDACOS MUDAR DIRECAO DOS PEDACOS
        if(this.corpo[0].x % this.tamanho == 0 && this.corpo[0].y % this.tamanho ==0){
            //console.log('virou')
            
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

        //VERIFICA COLISAO COM PAREDES EXTERNAS
        if(this.corpo[0].x + this.tamanho > canvas.width || this.corpo[0].x < 0 || this.corpo[0].y + this.tamanho > canvas.height || this.corpo[0].y < 0){
            gameOver = true
        }

        //VERIFICA COLISAO COM PAREDES INTERNAS
        let cabeca = this.corpo[0]
        jogo.paredes.forEach(parede => {
            if((cabeca.x + this.tamanho > parede.posicao.x && cabeca.x < parede.posicao.x + this.tamanho) &&
                (cabeca.y + this.tamanho > parede.posicao.y && cabeca.y < parede.posicao.y + this.tamanho)){
                    gameOver = true
            }
        })


        //VERIFICA COLISAO CONSIGO MESMO E MOVIMENTA
        this.corpo.forEach(pedaco => {

            if(pedaco != cabeca){

                switch (cabeca.direcao) {
                    case 'esquerda':
                    case "direita":
                        if(cabeca.x + this.tamanho > pedaco.x && cabeca.x < pedaco.x + this.tamanho && cabeca.y == pedaco.y){
                            gameOver = true
                        } 

                        break;

                    case "cima":
                    case "baixo":
                        if(cabeca.y + this.tamanho > pedaco.y && cabeca.y < pedaco.y + this.tamanho && cabeca.x == pedaco.x){
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
    constructor(){
        this.comidas = []
        this.paredes = []
    }
    desenharFundo(){
        for (let i = 0; i < canvas.width/snake.tamanho; i++) {
            for (let j = 0; j < canvas.height/snake.tamanho; j++) {
                ctx.fillStyle = (i+j)%2 == 0 ? '#3CB371' : '#2E8B57';
                ctx.fillRect(i*snake.tamanho, j*snake.tamanho, snake.tamanho, snake.tamanho)
                
                
            }
            
        }
    }
}

class Parede{
    constructor({
        posicao
    }){
        this.posicao = posicao
    }

    desenhar(){
        ctx.fillStyle = 'black'
        ctx.fillRect(this.posicao.x, this.posicao.y, snake.tamanho, snake.tamanho)
    }
    atualizar(){
        this.desenhar()
    }
}