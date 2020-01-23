class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
        scene.input.on("pointerdown", this.attack);
        this.pointer = scene.input.mousePointer;
        this.mouse = scene.input.mousePointer;
        this.movementKeys = scene.input.keyboard.addKeys('W,A,S,D');
        this.mouseLocation = scene.input.mousePointer.position;
        this.gun = null;
        this.cooldown = 0;
        this.speed = 200;
        this.shootingCooldown = 1000;
        this.health = 90;
        this.canShoot = true;
        this.inventory = [new Meth()];
        this.activeWeapon = null;
    }

    playerMovement() {
        //ROTATION
        let x = this.mouse.worldX - this.x;
        let y = this.mouse.worldY - this.y;
        let magnitude = Math.sqrt(x**2 + y**2);

        let rotationVector = {x: x/magnitude, y: y/magnitude};

        let rotationDegree = Math.acos(rotationVector.x);

        if(this.mouse.worldY < this.y) {
            rotationDegree = 2 * Math.PI - rotationDegree;
            
        }
        this.setRotation(rotationDegree);

        //MOVEMENT
        if (this.movementKeys.W.isDown) {
            this.setVelocityY(-this.speed);
        }else if (this.movementKeys.S.isDown) {
            this.setVelocityY(this.speed);
        }else {
            this.setVelocityY(0);
        }
        if (this.movementKeys.A.isDown) {
            this.setVelocityX(-this.speed);
        }else if (this.movementKeys.D.isDown) {
            this.setVelocityX(this.speed);
        }else {
            this.setVelocityX(0);
        }
    }

    switchGun(type, cooldown) {
        this.gun = type;
        this.cooldown = cooldown;
    }

    damage(damage) {
        this.health -= damage;
    }

    addItem(item) {
        this.inventory.push(item);
    }

    useItem(item) {
        console.log(item);
        let itemIndex = this.inventory.indexOf(item);
        console.log(itemIndex);
        if (itemIndex != -1) {
             this.inventory.splice(itemIndex, 1);
            item.use(this);
        }
        console.log(this.inventory);
    }

    attack(mouseClicked,  bulletGroup) {
        if (this.canShoot) {
            switch(this.gun) {
                case 'Pistol':
                    if (mouseClicked){
                        let bullet = new Bullet(this.scene, this.x, this.y);
                        let dx = 800 * Math.cos(this.rotation);
                        let dy = 800 * Math.sin(this.rotation);
                        bulletGroup.add(bullet, true);
                        bullet.fire(dx, dy);
                    }
                    break;
                case 'Machine':
                    let bullet = new Bullet(this.scene, this.x, this.y);
                        let dx = 1200 * Math.cos(this.rotation);
                        let dy = 1200 * Math.sin(this.rotation);
                        bulletGroup.add(bullet, true);
                        bullet.fire(dx, dy);
            }
                this.canShoot = false;
            setTimeout(() => {
                this.canShoot = true;
            }, this.cooldown);
        }
        
    }
}
