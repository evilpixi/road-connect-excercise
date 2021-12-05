class SplashScene extends Phaser.Scene {
    constructor()
    {
        super("SplashScene")
    }

    preload()
    {

    }

    create()
    {
        this.bgMusic = this.sound.play("music-bg")
        
        this.cameras.main.setBackgroundColor(0x23bf8e)
    }
}