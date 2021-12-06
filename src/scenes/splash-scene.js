class SplashScene extends Phaser.Scene {
    constructor()
    {
        super("SplashScene")
    }

    create()
    {
        this.bgMusic = this.sound.add("music-bg")
        this.bgMusic.play()
        this.bgMusic.volume = 0.5
        this.bgMusic.loop = true
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
        let animCompleted = false
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
            this.playText.width + 20,
            this.playText.height + 10,
            config.colors.background,
            1)
        .setDepth(-1)
        .setInteractive()
        .on("pointerdown", ()=> 
        {
            this.playPressHandler()
        })

        this.tweens.add({
            targets: this.playText,
            scale: 1,
            delay: duration * 1.5,
            duration: duration,
            ease: "Power3",
            onComplete: ()=> { animCompleted = true }
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

        let tl = this.tweens.createTimeline()

        tl.add({
            targets: this.playText,
            scale: 1.3,
            duration: 200,
            ease: "Back"
        })
        tl.add({
            targets: this.playText,
            scale: 1,
            duration: 200,
            ease: "Sine",
            onComplete: ()=> { this.goToNextScene() }
        })
    }

    
    /**
     * Destroys the scene elements and starts
     * the new scene.
     * It keeps this scene alive because:
     * - we want to keep the music still running.
     * - we want to keep the background color.
     * - we never go back to this scene.
     * @memberof SplashScene
     */
    goToNextScene()
    {
        this.roadText.destroy()
        this.connectText.destroy()
        this.playText.destroy()

        this.scene.launch("GameScene")
    }


}