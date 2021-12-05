class BootScene extends Phaser.Scene {
    constructor()
    {
        super("BootScene")
    }

    preload()
    {
        // roads
        for (let road of [
            "2curves",
            "corner",
            "cross",
            "curve",
            "rect",
            "single",
            "three"
        ]) this.load.image("road-" + road, "assets/game/road_" + road + ".png")

        // ui
        this.load.image("btn-menu", "assets/ui/button-menu.png")
        this.load.image("btn-red-press", "assets/ui/button-red_pressed.png")
        this.load.image("btn-red-normal", "assets/ui/button-red_normal.png")

        // audio
        this.load.audio("music-bg", "assets/audio/music-bg.wav")
        this.load.audio("sfx-appear", "assets/audio/sfx-appear.ogg")
        this.load.audio("sfx-click", "assets/audio/sfx-click.ogg")
        this.load.audio("sfx-rotate", "assets/audio/sfx-rotate.ogg")
        this.load.audio("sfx-level-complete", "assets/audio/sfx-level-complete.wav")
    }

    create()
    {
        
    }
}