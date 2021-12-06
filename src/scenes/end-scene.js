class EndScene extends Phaser.Scene
{
    constructor()
    {
        super("EndScene")
    }

    create()
    {
        // --------------- buttons --------------- 
        this.btnLevel = this.add.image(gWidth / 2, gHeight, "btn-menu")
        .setOrigin(0.5, 1)
        .setInteractive()
        .on("pointerdown", ()=> {
            this.sound.play("sfx-click")
            this.tweens.add({
                targets: this.btnLevel,
                duration: 200,
                alpha: 0,
                onComplete: ()=> this.scene.start("LevelSelectionScene")
            })
        })

        // --------------- buttons --------------- 
        let text = this.add.text(
            gWidth / 2, 
            gHeight / 2, 
            config.texts.endScene.end,
            config.textStyles.uiTitle
        ).setOrigin(0.5)
        .setAlpha(0)

        this.tweens.add({
            targets: text,
            alpha: 1,
            delay: 300,
            duration: 1200
        })
    }
}