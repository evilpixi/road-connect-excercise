const gWidth = 480
const gHeight = (window.innerHeight / window.innerWidth) * gWidth

var config = 
{
    colors: 
    {
        background: 0x23bf8e,
        levelSelectionPanel: 0x69c8aa,
        levelSelectionShadow: 0x1b8f68     
    },

    texts:
    {
        bootScene: {
            interact: "Please click\nto interact"
        },
        splashScene: {
            title1: "Road",
            title2: "Connect",
            start: "Play"
        },
        levelSelectScene: {
            title: "Level Select"
        },
        gameScene: {
            level: "Level"
        }
    },

    textStyles: 
    {
        uiTitle: {
            fontFamily: "f22203",
            color: "#ffffff",
            fontSize: 50,
            align: "center",
			shadow: { 
                offsetX: -2, 
                offsetY: 2, 
                color: '#000000', 
                fill: true,
                blur: 0
            },
            padding: { left: 0, bottom: 0 },
        },
        splashTitle: {
            fontFamily: "nonstop",
            color: "#ffffff",
            fontSize: 70,
			shadow: { 
                offsetX: -4, 
                offsetY: 4, 
                color: '#1b8f68', 
                fill: true,
                blur: 0
            },
            padding: { left: 5, bottom: 5 },
        }
    },

    game: {
        pieceSize: gWidth * 0.25,
        pieceCropSize: 0
    }
}