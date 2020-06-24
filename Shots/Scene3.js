class Scene3 extends Phaser.Scene {
    constructor() {
      super({ key: 'Scene3'})
    }

    create() {
        let video = this.add.video(-150, 40, 'scene3').setOrigin(0)

        video.play();

        video.on('complete', function(video) {
            this.scene.stop('Scene3')
            this.scene.start('MG2')
        }, this)
    }
}