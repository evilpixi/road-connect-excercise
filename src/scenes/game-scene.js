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
            if (this.isVictory()) this.scene.start("EndScene")
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
        const lvlData = levelData[this.level - 1].elements

        let maxX = lvlData[0].length - 1
        let maxY = lvlData.length - 1

        const size = config.game.pieceSize
        const neighborFromDirection = [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 }
        ]

        // create elements
        let piecesMatrix = []
        for (let row = 0; row <= maxY; row++)
        {
            piecesMatrix[row] = []
            for (let col = 0; col <= maxX; col++)
            {
                let pieceData = lvlData[row][col]

                if (pieceData === "  ") continue

                let piece = new Piece(
                    this,
                    col * size - col,
                    row * size - row,
                    pieceData[0],
                    Number(pieceData[1]),
                    row,
                    col
                )

                piecesMatrix[row][col] = piece
                this.piecesContainer.add(piece)
                this.pieces.push(piece)
            }
        }

        // create neighbors
        for (let row = 0; row <= maxY; row++)
        {
            for (let col = 0; col <= maxX; col++)
            {
                let currentPiece = piecesMatrix[row][col]
                console.log("--- looking for", row, col, " ---", currentPiece)

                for (let dir = 0; dir <= 3; dir++)
                {
                    let newRow = currentPiece.row + neighborFromDirection[dir].y
                    if (newRow > maxY || newRow < 0) continue
                    let newCol = currentPiece.col + neighborFromDirection[dir].x

                    let newPiece = piecesMatrix[newRow][newCol]
                    
                    if (!newPiece) continue
                    currentPiece.neighbors.push(newPiece)
                }
            }
        }

        // center
        if (maxX % 2)
        {
            this.piecesContainer.x = gWidth / 2 - (maxX - 0.5) * size
            this.piecesContainer.y = gHeight / 2 - (maxY - 0.5) * size
        }
        else 
        {
            this.piecesContainer.x = gWidth / 2 - (maxX - 1) * size
            this.piecesContainer.y = gHeight / 2 - (maxY - 1) * size
        }
    }



    /**
     * Returns true or false depending if the win condition is meet.
     * @returns {Boolean} true if win, false is not win
     * @memberof GameScene
     */
    isVictory()
    {
        return false
        let network = [this.pieces[0]]
        let pivots = [this.pieces[0]]

        while (!exit)
        {
            // pivots are pieces
            for (let pivot of pivots)
            {
                // connections are tuples
                let connections = PIECE_TYPES[pivot.type].connections
                let effectiveConnections = []
                for (let conn of connections)
                {
                    // real is connection taking account the current direction
                    let realFromPivot = [conn[0] + pivot.dir, conn[1] + pivot.dir]
                    if (realFromPivot[0] > 3) realFromPivot[0] -= 4
                    if (realFromPivot[1] > 3) realFromPivot[1] -= 4
                }
            }

            exit = true
        }

        return true
    }
}