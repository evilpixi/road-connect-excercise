class GameScene extends Phaser.Scene {
    constructor()
    {
        super("GameScene")
    }

    create(data)
    {
        this.level = data.level

        
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

        
        // --------------- text --------------- 
        this.add.text(
            gWidth/2,
            20,
            `${config.texts.gameScene.level} ${this.level}`,
            config.textStyles.uiTitle
        ).setOrigin(0.5, 0)

        
        // --------------- gameplay elements --------------- 
        this.createElements()
    }

    createElements()
    {

    }
}