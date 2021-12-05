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
        this.bgMusic = this.sound.add("music-bg")
        this.bgMusic.play()
        this.bgMusic.volume = 0.5
        this.bgMusic.loop = true
        this.cameras.main.setBackgroundColor(config.colors.background)

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

        let animCompleted = false
        this.playText = this.add.text(
            gWidth / 2, 
            gHeight * 0.7,
            config.texts.splashScene.start,
            config.textStyles.splashSubtitle
        ).setOrigin(0.5)
        .setScale(0)

        this.add.rectangle(
            this.playText.x, 
            this.playText.y,
            this.playText.width + 10,
            this.playText.height + 10,
            config.colors.background,
            1)
        .setDepth(-1)
        .setInteractive()
        .on("pointerdown", ()=> 
        {
            this.sound.play("sfx-click")

            this.tweens.add({
                targets: this.playText,
                scale: 1.3,
                duration: 200,
                ease: "Back",
                onComplete: ()=> { 
                    this.tweens.add({
                        targets: this.playText,
                        scale: 1,
                        duration: 200,
                        ease: "Sine",
                        onComplete: ()=> {
                            this.startNextScene()
                        }
                    })
                
                }
            })
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

    startNextScene()
    {
        this.scene.launch("GameScene")

        this.roadText.destroy()
        this.connectText.destroy()
        this.playText.destroy()
    }
}