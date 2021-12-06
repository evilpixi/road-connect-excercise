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
    backgroundColor: config.colors.background,
    pixelArt: false,
    scene: [
        BootScene,
        SplashScene,
        LevelSelectScene,
        GameScene
    ]
})