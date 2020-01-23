// Game Configuration
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade'
    },
    scene: [GameScene, UI, InventoryScene]
}

let game = new Phaser.Game(config);