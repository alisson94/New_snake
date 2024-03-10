const botaoJogar = document.querySelector('p.jogar')

addEventListener('keypress', (e)=>{
    
    switch (e.key) {
        
        case 'w': 
            if (snake.corpo[0].direcao != 'baixo') {
                snake.corpo[0].proxima_direcao = 'cima'
            }
            break;
        case 's':  
            if (snake.corpo[0].direcao != 'cima') {
                snake.corpo[0].proxima_direcao = 'baixo'
            }
            break;
    
        case 'd':
            if (snake.corpo[0].direcao != 'esquerda') {
                snake.corpo[0].proxima_direcao = 'direita'
            }
            break;
    
        case 'a':
            if (snake.corpo[0].direcao != 'direita') {
                snake.corpo[0].proxima_direcao = 'esquerda'
            }
            break;
    
        default:
            break;
    }
})

document.querySelector('p.jogar').addEventListener('click', ()=>{
    document.querySelector('div.menu').style.display = 'none'
    gameOver = false
    iniciar()
})
