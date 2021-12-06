class SplashScene extends Phaser.Scene {
    constructor()
    {
        super("SplashScene")
    }

    create()
    {
        this.cameras.main.setBackgroundColor(config.colors.background)

        
        // --------------- tittle texts --------------- 
        const startDX = gWidth * 0.5
        this.roadText = this.add.text(
            0 - startDX,
            gHeight * 0.45 - 80,
            config.texts.splashScene.title1,
            config.textStyles.splashTitle
        ).setOrigin(0.5)

        
        this.connectText = this.add.text(
            gWidth + startDX,
            gHeight * 0.45,
            config.texts.splashScene.title2,
            config.textStyles.splashTitle
        ).setOrigin(0.5)


        const duration = 500
        this.tweens.add({
            targets: this.roadText,
            x: gWidth/2,
            duration: duration,
            ease: "Power3"
        })
        this.tweens.add({
            targets: this.connectText,
            x: gWidth/2,
            duration: duration,
            ease: "Power3",
            delay: duration * 0.25
        })


        
        // --------------- play button ---------------
        this.playText = this.add.text(
            gWidth / 2, 
            gHeight * 0.7,
            config.texts.splashScene.start,
            config.textStyles.uiTitle
        ).setOrigin(0.5)
        .setScale(0)

        this.add.rectangle(
            this.playText.x - 2, 
            this.playText.y - 2,
            this.playText.width + 30,
            this.playText.height + 20,
            0xff0000,//config.colors.background,
            0)
        .setDepth(1)
        .setInteractive()
        .once("pointerdown", ()=> this.playPressHandler())

        this.tweens.add({
            targets: this.playText,
            scale: 1,
            delay: duration * 1.5,
            duration: duration,
            ease: "Power3"
        })
    }


    /**
     * Animates the play button and then
     * starts the next scene
     *
     * @memberof SplashScene
     */
    playPressHandler()
    {
        this.sound.play("sfx-click")

        let timeline = this.tweens.createTimeline()

        timeline.add({
            targets: this.playText,
            scale: 1.3,
            duration: 200,
            ease: "Back"
        })
        timeline.add({
            targets: this.playText,
            scale: 1,
            duration: 200,
            ease: "Sine",
            onComplete: ()=> this.scene.start("LevelSelectionScene")
        })

        timeline.play()
    }
}