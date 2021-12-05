const gWidth = 480
const gHeight = (window.innerHeight / window.innerWidth) * gWidth

const game = new Phaser.Game({
    type: Phaser.WEBGL,
    scale: {
        parent: 'gamediv',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_VERTICALLY,
        width: gWidth,
        height: gHeight
    },
    pixelArt: false,
    scene: [
        BootScene,
        GameScene
    ]
})