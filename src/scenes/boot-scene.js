class BootScene extends Phaser.Scene {
    constructor()
    {
        super("BootScene")
    }

    preload()
    {
        // --------------- loadbar --------------- 
        this.cameras.main.setBackgroundColor(0x23bf8e)


        const height = 40
        this.outBar = this.add.graphics()
        this.outBar.lineStyle(2, 0xffffff, 1)
        this.outBar.strokeRoundedRect(
            -gWidth * 0.4, 
            -20, 
            gWidth * 0.8, 
            height, 
            5)
        this.outBar.setPosition(gWidth / 2, gHeight / 2)


        const padding = 8
        this.fillBar = this.add.rectangle(
            gWidth * 0.1 + padding/2,
            gHeight / 2,
            gWidth * 0.8 - padding,
            height - padding,
            0xffffff)
        .setOrigin(0, 0.5)
        .setScale(0, 1)


        this.load.on("progress", (value)=> 
        {
            this.fillBar.setScale(value, 1)
        })
        this.load.on("complete", ()=> 
        {
            let interactText = this.add.text(
                gWidth / 2, 
                gHeight * 0.65, 
                config.texts.bootScene.interact,
                config.textStyles.splashSubtitle)
            .setOrigin(0.5)
            .setAlpha(0)

            this.tweens.add({
                targets: interactText,
                alpha: 1,
                duration: 1000,
                yoyo: true,
                repeat: -1,
                ease: "Circ"
            })

            this.input.on("pointerdown", ()=> 
            {
                this.scene.start("SplashScene")
            })
        })



        // --------------- roads --------------- 
        for (let road of [
            "2curves",
            "corner",
            "cross",
            "curve",
            "rect",
            "single",
            "three"
        ]) this.load.image("road-" + road, "assets/game/road_" + road + ".png")



        // --------------- ui --------------- 
        this.load.image("btn-menu", "assets/ui/button-menu.png")
        this.load.image("btn-red-press", "assets/ui/button-red_pressed.png")
        this.load.image("btn-red-normal", "assets/ui/button-red_normal.png")



        // --------------- audio --------------- 
        this.load.audio("music-bg", "assets/audio/music-bg.wav")
        this.load.audio("sfx-appear", "assets/audio/sfx-appear.ogg")
        this.load.audio("sfx-click", "assets/audio/sfx-click.ogg")
        this.load.audio("sfx-rotate", "assets/audio/sfx-rotate.ogg")
        this.load.audio("sfx-level-complete", "assets/audio/sfx-level-complete.wav")
    }

    create()
    {
        this.scene.start("SplashScene")
    }
}