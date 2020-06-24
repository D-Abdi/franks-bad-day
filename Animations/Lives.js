class Lives {
    constructor() {
    // Code voor levens regelen
    switch(gameState.lives) {
        case 8:
          lives.setTexture('9lives', 1)
          break;
        case 7:
          lives.setTexture('9lives', 2)
          break;
        case 6:  
          lives.setTexture('9lives', 3)
          break;
        case 5:
          lives.setTexture('9lives', 4)
          break;
        case 4:  
          lives.setTexture('9lives', 5)
          break;
        case 3:  
          lives.setTexture('9lives', 6)
          break;
        case 2:  
          lives.setTexture('9lives', 7)
          break;
        case 1:  
          lives.setTexture('9lives', 8)
          break;
        case 0:  
          lives.setTexture('9lives', 9)       
          break;              
      }
       
    }

    
}