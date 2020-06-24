class Scene4 extends Phaser.Scene {
    constructor() {
      super({ key: 'Scene4'})
    }

    create() {
        let video = this.add.video(-150, 40, 'scene4').setOrigin(0)

        video.play();

        video.on('complete', function(video) {
            this.scene.stop('Scene4')
            this.scene.start('MG3')
        }, this)
    }
}