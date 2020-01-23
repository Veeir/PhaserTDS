class Blood extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture='blood', frame);
        scene.sys.displayList.add(this);
        this.setDepth(-1);
    }
}