let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = 900
canvas.height = 600

let gameOver = false
let pontos = 0

let snake = new Snake()
let jogo = new Jogo()

function gerarComida() {
    let comidaX = Math.floor(Math.random() * canvas.width/snake.tamanho) * snake.tamanho
    let comidaY = Math.floor(Math.random() * canvas.height/snake.tamanho) * snake.tamanho

    for (const parte of snake.corpo) {
        if(parte.x == comidaX && parte.y == comidaY){
            gerarComida()
            return
        }
    }

    for (const parte of jogo.paredes) {
        if(parte.posicao.x == comidaX && parte.posicao.y == comidaY){
            gerarComida()
            return
        }
    }

    const comida = new Comida({
        posicao:{
            x: comidaX, 
            y: comidaY
        }

    })
    jogo.comidas.push(comida)
}

function gerarPosicao() {
    let posicaoX = Math.floor(Math.random() * canvas.width/snake.tamanho) * snake.tamanho
    let posicaoY = Math.floor(Math.random() * canvas.height/snake.tamanho) * snake.tamanho
    return { x: posicaoX, y: posicaoY }
}

function gerarParede() {
    let posicao = gerarPosicao()

    while (true) {
        posicaoX = Math.floor(Math.random() * canvas.width/snake.tamanho) * snake.tamanho
        posicaoY = Math.floor(Math.random() * canvas.height/snake.tamanho) * snake.tamanho

        let found = false

        for (const parte of snake.corpo) {
            if(parte.x == posicaoX && parte.y == posicaoY){
                found = true
                break
            }
        }

        if (found) {
            continue
        }

        for (const parte of jogo.paredes) {
            if(parte.posicao.x == posicaoX && parte.posicao.y == posicaoY){
                found = true
                break
            }
        }

        if (found) {
            continue
        }

        const parede = new Parede({
            posicao:{
                x: posicaoX,
                y: posicaoY
            }
        })

        jogo.paredes.push(parede)
        break
    }
}

function gui(){
    ctx.font = '45px Pixelify Sans'
    ctx.textAlign = 'left'
    ctx.fillStyle = 'white'
    ctx.fillText('Pontos: ' + pontos, 10, 50)
    ctx.strokeText('Pontos: ' + pontos, 10, 50)

}

jogo.desenharFundo()

function iniciar(){
    snake = new Snake()
    jogo = new Jogo()
    gerarComida() 
    loop()
}

//loop()
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    jogo.desenharFundo()

    snake.atualizar()

    detectarColisao()

    jogo.paredes.forEach(parede => {
        parede.atualizar()
    })

    gui()

    if(gameOver){
        console.log('game over')
        document.querySelector('div.menu').style.display = 'flex'
    }else{
        window.requestAnimationFrame(loop)
    }
}

function detectarColisao() {
    jogo.comidas.forEach((comida, i)=>{
        comida.atualizar()

        if(comida.posicao.x == snake.corpo[0].x && comida.posicao.y == snake.corpo[0].y){
            jogo.comidas.splice(i, 1)
            snake.corpo.length%3 == 0 ? gerarParede() : null 
            gerarComida()
            snake.aumentar()
        }
    })
}