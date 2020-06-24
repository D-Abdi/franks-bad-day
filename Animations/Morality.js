class Morality {
    constructor() {
        switch(gameState.morality){
            case 100:
              moralityBar.setTexture('morality', 0)
              break;
            case 90:
              moralityBar.setTexture('morality', 1)  
              break;
            case 80:
              moralityBar.setTexture('morality', 2)
              break;
            case 75:
              moralityBar.setTexture('morality', 3) 
              break;
            case 70:
              moralityBar.setTexture('morality', 4)
              break;
            case 60:
              moralityBar.setTexture('morality', 5)
              break;
            case 50:
              moralityBar.setTexture('morality', 6)
              break;
            case 40:
              moralityBar.setTexture('morality', 7)
              break;
            case 30:
              moralityBar.setTexture('morality', 8)
              break;
            case 25:
              moralityBar.setTexture('morality', 9)
              break;
            case 20:
              moralityBar.setTexture('morality', 10) 
              break;
            case 10:
              moralityBar.setTexture('morality', 11) 
              break;   
            case 0:
              moralityBar.setTexture('morality', 12) 
              break;                                  
          }
    }
}