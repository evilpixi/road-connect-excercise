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


        // --------------- check rotations --------------- 
        this.events.on("piecerotated", ()=> {
            //if (this.isVictory()) this.scene.start("EndScene")
        })
    }

    /**
     * Add all the pieces on the play zone
     *
     * @memberof GameScene
     */
    createElements()
    {
        this.piecesContainer = this.add.container()
        this.pieces = []
        let maxX = 0
        let maxY = 0

        const size = config.game.pieceSize
        const crop = config.game.pieceCropSize

        for (let [i, pieceData] of levelData[this.level - 1].elements.entries())
        {
            if (pieceData.x > maxX) maxX = pieceData.x
            if (pieceData.y > maxY) maxY = pieceData.y

            let piece = new Piece(
                this,
                pieceData.x * size - crop * i * 2,
                pieceData.y * size - crop * i * 2,
                PIECE_TYPES[pieceData.type],
                pieceData.dir
            )

            this.piecesContainer.add(piece)
        }

        this.piecesContainer.x = gWidth / 2 - (maxX - 1) * size
        this.piecesContainer.y = gHeight / 2 - (maxY - 1) * size
    }



    /**
     * Returns true or false depending if the win condition is meet.
     * @returns {Boolean} true if win, false is not win
     * @memberof GameScene
     */
    isVictory()
    {
        return true
    }
}