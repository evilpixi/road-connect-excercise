/**
 * Representates every piece object
 *
 * @class Piece
 * @extends {Phaser.GameObjects.Sprite}
 */
class Piece extends Phaser.GameObjects.Sprite
{
    /**
     * Creates an instance of Piece.
     * @param {Phaser.Scene} scene the gameObjectScene
     * @param {Number} x x position
     * @param {Number} y y position
     * @param {PIECE_TYPES} a curve type from CURVE_TYPES.
     * Default is PIECE_TYPES.single
     * @param {Number} pieceDirection an Int from 0 to 3 representing the direction.
     * The standard value is 0 and is clockwise up.
     * The default value is also 0.
     * @memberof Piece
     */
    constructor(
        scene, 
        x, 
        y, 
        type = "c", 
        pieceDirection = 0, 
        row, 
        col)
    {
        super(scene, x, y, "road-" + PIECE_TYPES[type].name)
        scene.add.existing(this)

        this.dir = pieceDirection
        this.row = row
        this.col = col
        this.type = type

        this.currentConnections = [...PIECE_TYPES[type].connections]

        // clockwise, 0 is up
        this.neighbors = []

        this.changeDirection(pieceDirection)

        const size = config.game.pieceSize
        this.setDisplaySize(size, size)
        this.cropSize = 1

        // creation Tween
        let newScale = this.scale
        let t0 = Phaser.Math.Between(0, 600)
        this.scale = 0
        scene.tweens.add({
            targets: this,
            duration: 400,
            scale: newScale,
            delay: t0,
            onStart: ()=> { this.scene.sound.play("sfx-rotate") }
        })

        this.setInteractive()
        this.on("pointerdown", ()=> {
            this.rotateOne()
        })
        this.rotating = false
    }


    
    /**
     * Upadtes the current possible connections
     * based on current rotation.
     *
     * @memberof Piece
     */
    updateConnections()
    {
        for (let conn of this.currentConnections)
        {
            conn[0] += this.dir
            if (conn[0] > 3) conn[0] -= 4

            
            conn[1] += this.dir
            if (conn[1] > 3) conn[1] -= 4
        }
    }


    /**
     * Changes the current direction of the piece
     *
     * @param {Number} direction an Int from 0 to 3,
     * being 0 up, 1 right, 2 down and 3 left.
     * Default value is 0.
     * @memberof Piece
     */
    changeDirection(direction = 0)
    {
        console.log("direction: " + direction)
        this.dir = direction
        this.angle = 90 * this.dir

        this.updateConnections()
    }

    
    /**
     * Changes the sprite rotation 90 degrees and updates
     * dir to +1 (or 0 if dir > 3).
     * Also plays an animation while rotating.
     *
     * @memberof Piece
     */
    rotateOne()
    {
        if (this.rotating) return
        this.rotating = true

        this.scene.sound.play("sfx-rotate")

        this.dir++

        this.updateConnections()

        const newAngleCorrection = {
            1: 90,
            2: 180,
            3: -90,
            4: 0
        }

        this.scene.tweens.add({
            targets: this,
            angle: newAngleCorrection[this.dir],
            duration: 200,
            onComplete: ()=> 
            { 
                this.rotating = false 
                if (this.dir > 3) {
                    this.dir = 0
                    this.angle = 0
                }

                this.scene.events.emit("piecerotated")
            }
        })
    }
}


/** @type {Object} 
 * Defines the different piece types
*/
const PIECE_TYPES = {
    "2": {
        name: "2curves",
        connections: [ 0, 1, 2, 3 ]
    },
    "L": {
        name: "corner",
        connections: [ 1, 2 ]
    },
    "+": {
        name: "cross",
        connections: [ 0, 1, 2, 3 ]
    },
    "c": {
        name: "curve",
        connections: [ 
            [1, 2], 
            [2, 1] 
        ]
    },
    "|": {
        name: "rect",
        connections: [ 0, 2 ]
    },
    "-": {
        name: "single",
        connections: [ 1 ]
    },
    "T": {
        name: "three",
        connections: [ 0, 1, 2 ]
    }
}