class Scene6 extends Phaser.Scene {
    constructor() {
      super({ key: 'Scene6'})
    }

    create() {
        let video = this.add.video(-150, 40, 'scene6').setOrigin(0)

        video.play();

        video.on('complete', function(video) {
            this.scene.stop('Scene6')
            if(gameState.morality > 60 ){
                this.scene.start('Dil5_Good')
            } else if(gameState.morality < 60 && gameState.morality > 15){
                this.scene.start('Dil5')
            } else if(gameState.morality < 15) {
                this.scene.start('Dil5_Bad')
            }
        }, this)
    }
}