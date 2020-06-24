class Intro extends Phaser.Scene {
    constructor() {
      super({ key: 'Intro'})
    }

    create() {
        let video = this.add.video(-150, 40, 'introScene').setOrigin(0)

        let video2 = this.add.video(-150, 40, 'scene1').setOrigin(0)
        video2.alpha = 0
        video2.isPaused = true

        video.play();

        video.on('complete', function(video) {
            video2.alpha = 1
            video2.play();
        }, this)

        video2.on('complete', function(video2) {
            this.scene.stop('Intro')
            this.scene.start('Disc')
        }, this)
    }
}