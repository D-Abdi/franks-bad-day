class Scene5_1 extends Phaser.Scene {
    constructor() {
      super({ key: 'Scene5_1'})
    }

    create() {
        let video = this.add.video(-150, 40, 'scene5_1').setOrigin(0)

        video.play();

        video.on('complete', function(video) {
            this.scene.stop('Scene5_1')
            this.scene.start('Dil4')
        }, this)
    }
}