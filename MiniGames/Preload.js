
class Preload extends Phaser.Scene {
    constructor() {
      super({ key: 'Preload'})
    }

    preload() {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(340, 370, 320, 50);
        // Text loading aanpassen
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading',
            style: {
                font: '24px comic sans ms',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        // Progress bar aanpassen
        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '20px comic sans ms',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        // Rechthoek progress bar 
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(350, 380, 300 * value, 30);
        });
        // Progress bar als die voltooit is
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });    
        for (let i = 0; i < 1000; i++) {
            // Laad plug in
            var url;
      
            url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js';
            this.load.plugin('rexbbcodetextplugin', url, true);
            
            url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextextpageplugin.min.js';
            this.load.plugin('rextextpageplugin', url, true);
            
            url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexttypingplugin.min.js';
            this.load.plugin('rextexttypingplugin', url, true);
         
            // Achtergrond dilemma's
            this.load.image('bear', 'assets/dilemmas/bearNeutral.jpeg')
            this.load.image('bearHappy', 'assets/dilemmas/bearHappy.jpeg')
            this.load.image('bearAngry', 'assets/dilemmas/bearAngry.jpeg')
            this.load.image('racoon', 'assets/dilemmas/racoonNeutral.jpeg')
            this.load.image('racoonAngry', 'assets/dilemmas/racoonAngry.jpeg')
            this.load.image('racoonHappy', 'assets/dilemmas/racoonHappy.jpeg')
            this.load.image('snake', 'assets/dilemmas/snake.jpeg')
            this.load.image('snakeAngry', 'assets/dilemmas/snakeAngry.jpeg')
            this.load.image('snakeHappy','assets/dilemmas/snakeHappy.jpeg')
            this.load.image('dog', 'assets/dilemmas/dogNeutral.jpeg')
            this.load.image('dogAngry', 'assets/dilemmas/dogAngry.jpeg')
            this.load.image('goat', 'assets/dilemmas/goatNeutral.jpeg')
            this.load.image('goatAngry', 'assets/dilemmas/goatAngry.jpeg')
            // Morality Bar
            this.load.spritesheet('morality', 'assets/morality.png', {frameWidth: 120, frameHeight: 120}) 
            // Character sprites
            this.load.spritesheet('Bear', 'assets/animals/Bear.png', {frameWidth: 27, frameHeight: 41} )
            this.load.spritesheet('Frank', 'assets/animals/Frank.png', {frameWidth: 31, frameHeight: 42})
            this.load.spritesheet('FrankKnife', 'assets/animals/FrankKnife.png', {frameWidth: 31, frameHeight: 42})
            this.load.spritesheet('Snake', 'assets/animals/Snake.png', {frameWidth: 30, frameHeight: 36})
            this.load.spritesheet('Dog', 'assets/animals/Dog.png', {frameWidth: 27, frameHeight: 41})
            this.load.spritesheet('CoWorker', 'assets/animals/Coworker.png', {frameWidth: 31, frameHeight: 42})
            //      
            this.load.image('bg', 'assets/background.jpg')
            this.load.image('rain', 'assets/rain.png')
            this.load.spritesheet('codey', 'assets/codey.png', { frameWidth: 72, frameHeight: 90 });
            this.load.spritesheet('snowman', 'assets/snowman.png', { frameWidth: 50, frameHeight: 70 });
            this.load.spritesheet('9lives', 'assets/Lives.png', {frameWidth: 100, frameHeight: 100})
            this.load.tilemapTiledJSON('map', 'assets/indoorTest2.json');
            this.load.image('tiles', 'assets/RPGmap.png')
            this.load.image('wallet', 'assets/wallet.png')
            this.load.image('keys', 'assets/keys.png')
            this.load.image('phone', 'assets/phone.png')
            this.load.image('door', 'assets/door.png')
            this.load.image('yarn', 'assets/yarn.png')
            this.load.image('tiles2', 'assets/RPGmap.png')
            this.load.tilemapTiledJSON('map2', 'assets/miniGame2.json');
            this.load.image('tiles3', 'assets/RPGmap.png');
            this.load.tilemapTiledJSON('map3', 'assets/miniGame3.json');
            this.load.image('map', 'assets/roguelikeCity.png')
            this.load.tilemapTiledJSON('tileset', 'assets/miniGame4test1.json')    
        }
    }

    create() {
        this.scene.stop('Preload')
        this.scene.start('Title')
    }
}      