class LevelSelectScene extends Phaser.Scene
{
    constructor()
    {
        super("LevelSelectionScene")
    }

    create()
    {
        // --------------- title --------------- 
        this.add.text(
            gWidth/2,
            gHeight * 0.09,
            config.texts.levelSelectScene.title,
            config.textStyles.uiTitle
        ).setOrigin(0.5)


        
        // --------------- rectangle --------------- 
        let gr = this.add.graphics()

        const rectWidth = gWidth * 0.8
        const rectHeight = gHeight * 0.7

        gr.fillStyle(config.colors.levelSelectionShadow, 0.7)
        gr.fillRoundedRect(
            -gWidth * 0.4 - 1, 
            -gHeight * 0.3 + 2,
            rectWidth,
            rectHeight - 4,
            6)
            
        
        gr.fillStyle(config.colors.levelSelectionPanel, 1)
        gr.fillRoundedRect(
            -gWidth * 0.4,
            -gHeight * 0.3,
            rectWidth,
            rectHeight,
            6)

        
        gr.lineStyle(1, config.colors.levelSelectionShadow, 0.5)
        gr.strokeRoundedRect(
            -gWidth * 0.4,
            -gHeight * 0.3,
            rectWidth,
            rectHeight,
            6)

        gr.setPosition(gWidth / 2, gHeight / 2)


        
        // --------------- buttons --------------- 
        let container = this.add.container(gWidth / 2, gHeight * 0.24)

        for (let i = 0; i < levelData.length; i++)
        {
            let levelNumber = i + 1
            let separation = gWidth * 0.028
            let buttonSize = gWidth * 0.15

            let button = this.add.sprite(
                buttonSize * i + separation * i, 
                buttonSize + buttonSize * Math.floor(i / 4)  + separation * Math.floor(i / 4), 
                "btn-red-normal")
            .setDisplaySize(buttonSize, buttonSize)
            .setOrigin(0, 1)
            button.x -= (2 * buttonSize + separation * 1.5)

            
            let text = this.add.text(
                button.x + buttonSize / 2,
                button.y - buttonSize / 2 - 3,
                levelNumber,
                config.textStyles.uiTitle)
            .setOrigin(0.5)
            .setScale(0.8)
            

            let rect = this.add.rectangle(
                button.x + buttonSize / 2,
                button.y - buttonSize / 2,
                buttonSize + 5,
                buttonSize + 5,
                0xff0000,
                0
            )
            .setDepth(10)
            .setInteractive()
            .on("pointerdown", ()=> 
            {
                button.setTexture("btn-red-press")
                button.setDisplaySize(buttonSize, buttonSize)
            })
            .on("pointerup", ()=> {
                button.setTexture("btn-red-normal")
                button.setDisplaySize(buttonSize, buttonSize)
                this.time.delayedCall(100, ()=> this.scene.start("GameScene", { level: i + 1 }))
            })

            container.add(button)
            container.add(text)
            container.add(rect)
        }

    }
}