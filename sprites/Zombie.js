class Zombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
        this.canAttack = true;
        this.health = 100;
        this.rotationDegree = 0;
    }

    zombieMovement(playerLocation) {
        let x = playerLocation.x- this.x;
        let y = playerLocation.y - this.y;
        let magnitude = Math.sqrt(x**2 + y**2);
        let rotationVector = {x: x/magnitude, y: y/magnitude};
        let rotationDegree = Math.acos(rotationVector.x);
        let distFromPlayer = Math.sqrt(x**2 + y**2);

        if(playerLocation.y < this.y) {
            rotationDegree = 2 * Math.PI - rotationDegree;
            
        }
        this.rotationDegree = rotationDegree;
        if (distFromPlayer < 300) {
            this.setRotation(this.rotationDegree);
            this.setVelocity(25*Math.cos(rotationDegree), 25*Math.sin(rotationDegree));
        }else {
            this.setVelocity(0, 0);
        }
    }

    attack(player) {
        if (this.canAttack) {
            player.damage(10);
            this.canAttack = false;
            this.setAttackCooldown();
        }
    }

    setAttackCooldown() {
        setTimeout(() => {
            this.canAttack = true;
        }, 3000)
    }

    damage(health) {
        this.health -= health;
        this.knockBack();
    }

    checkDead() {
        if (this.health <= 0) {
            this.setActive(false);
        }
    }
    
    knockBack() {
        let knockbackDirection = this.rotationDegree + Math.PI;
        let knockbackX = 25*Math.cos(knockbackDirection);
        let knockbackY = 25*Math.sin(knockbackDirection);
        this.x += knockbackX;
        this.y += knockbackY;
    }
}

