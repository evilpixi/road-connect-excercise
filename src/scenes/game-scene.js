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
        this.title = this.add.text(
            gWidth/2,
            20,
            `${config.texts.gameScene.level} ${this.level}`,
            config.textStyles.uiTitle
        ).setOrigin(0.5, 0)

        if (!data.fromSelection)
        {
            let x0 = this.title.x
            this.title.x = gHeight + 500

            this.tweens.add({
                targets: this.title,
                x: x0,
                duration: 700,
                delay: 100,
                ease: "Power0",
                onComplete: ()=> this.createElements()
            })
        }

        
        // --------------- gameplay elements --------------- 
        if (data.fromSelection) this.createElements()


        // --------------- check rotations --------------- 
        this.events.on("piecerotated", ()=> {
            if (this.isVictory()) {
                this.playEndAnimation()
                this.sound.play("sfx-level-complete")
            }
        })
    }

    playEndAnimation()
    {
        let timeline = this.tweens.createTimeline()
        timeline.add({
            targets: this.title,
            x: -500,
            duration: 700,
            delay: 100,
            ease: "Power0"
        })
        timeline.add({
            targets: this.pieces,
            scale: 0,
            duration: 400,
            delay: 200,
            onComplete: ()=> {
                if (this.level == 4) this.scene.start("EndScene")
                else this.scene.start("GameScene", {
                    level: this.level + 1,
                    fromSelection: false
                })
            }
        })
        timeline.play()
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

        maxX = lvlData[0].length - 1
        maxY = lvlData.length - 1

        const size = config.game.pieceSize


        // create elements
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

        /*
        // create neighbors
        for (let row = 0; row <= maxY; row++)
        {
            for (let col = 0; col <= maxX; col++)
            {
                let currentPiece = piecesMatrix[row][col]
                
                for (let dir = 0; dir <= 3; dir++)
                {
                    if (!currentPiece) continue

                    let newRow = currentPiece.row + neighborFromDirection[dir].y
                    if (newRow > maxY || newRow < 0) continue
                    let newCol = currentPiece.col + neighborFromDirection[dir].x

                    let newPiece = piecesMatrix[newRow][newCol]
                    
                    if (!newPiece) continue
                    currentPiece.neighbors.push(newPiece)
                }
            }
        }*/

        // center
        if (maxX % 2)
        {
            this.piecesContainer.x = gWidth / 2 - (maxX) * size / 2
            this.piecesContainer.y = gHeight / 2 - (maxY) * size / 2
        }
        else 
        {
            this.piecesContainer.x = gWidth / 2 - (maxX - 1) * size
            this.piecesContainer.y = gHeight / 2 - (maxY - 1) * size
        }

        for (let piece of this.pieces)
        {
        }
    }



    /**
     * Returns true or false depending if the win condition is meet.
     * @returns {Boolean} true if win, false is not win
     * @memberof GameScene
     */
    isVictory()
    {
        let network = [this.pieces[0]]
        let currentPivots = [this.pieces[0]]

        let exit = false
        let completed = false
        while (!exit)
        {
            console.log(network)
            let newPivots = []
            // pivots are pieces
            for (let pivot of currentPivots)
            {
                let pivotCurrentConns = pivot.currentConnections

                // connections are tuples
                for (let conn of pivotCurrentConns)
                {
                    let dir = conn[0]

                    let newRow = pivot.row + neighborFromDirection[dir].y
                    if (newRow > maxY || newRow < 0) continue
                    let newCol = pivot.col + neighborFromDirection[dir].x
                    
                    let newPiece = piecesMatrix[newRow][newCol]

                    if (!newPiece) continue

                    let connected = false
                    for (let otherConn of newPiece.currentConnections)
                    {
                        if (otherConn[1] == neighborFromMirror[dir]) connected = true
                    }

                    // check for double curve


                    if (connected) {
                        if (network.includes(newPiece)) continue

                        network.push(newPiece)

                        if (newPivots.includes(newPiece)) continue
                        newPivots.push(newPiece)
                    }
                }
            }

            if (newPivots.length == 0)
            {
                exit = true
                continue
            }

            currentPivots = [...newPivots]

            if (network.length == this.pieces.length)
            {
                exit = true
                completed = true
                continue
            }
        }

        return completed
    }
}

const neighborFromDirection = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
]
const neighborFromMirror = [
    2,
    3,
    0,
    1
]
let piecesMatrix = []
let maxX = 0
let maxY = 0