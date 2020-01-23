class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture='bullet');
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
    }

    fire (dx, dy) {
        this.setVelocity(dx, dy);
    }

}
