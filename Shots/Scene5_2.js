class Scene5_2 extends Phaser.Scene {
    constructor() {
      super({ key: 'Scene5_2'})
    }

    create() {
        let video = this.add.video(-150, 40, 'scene5_2').setOrigin(0)

        video.play();

        video.on('complete', function(video) {
            this.scene.stop('Scene5_2')
            this.scene.start('MG4')
        }, this)
    }
}