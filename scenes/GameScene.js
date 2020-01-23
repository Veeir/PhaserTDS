class GameScene extends Phaser.Scene {
    constructor() {
        super({key: "Game", active : true});
        this.gunSwap = this.gunSwap.bind(this);
    }

    preload() {
        this.load.image('background', ['../assets/background.png', '../assets/background_n.png']);
        this.load.image('player', '../assets/PNG/Soldier/soldier1_hold.png');
        this.load.image('playerPistol', '../assets/PNG/Soldier/soldier1_gun.png');
        this.load.image('playerMachine', '../assets/PNG/Soldier/soldier1_machine.png');
        this.load.image('zombie', ['../assets/PNG/Zombie/zombie1_hold.png', '../assets/PNG/Zombie/zombie1_hold_n.png']);
        this.load.image('bullet', '../assets/bullet.png');
        this.load.image('tile', ['../assets/PNG/Tiles/tile_12.png', '../assets/PNG/Tiles/tile_12_n.png']);
        this.load.image('tileSet', '../assets/Tilesheet/tilesheet_complete.png');
        this.load.tilemapTiledJSON('map1', '../assets/maps/map1.json');
        this.load.image('blood', '../assets/blood.png');
    }

    create() {
        //EVENTS
        this.input.keyboard.on('keydown', this.gunSwap);
        this.input.keyboard.on('keydown-I', this.inventoryToggle, this);
        //this.scene.start('Inventory');

        //SPRITES
        this.player = new PlayerSprite(this, 300, 300, 'player');
        this.zombies = this.physics.add.group(
            [new Zombie(this, 200, 200, 'zombie')]
        );
        this.bullets = this.physics.add.group();

        //CAMERA
        this.cameras.main.startFollow(this.player);

        //MOUSE
        this.mouse = this.input.mousePointer;

        //MAP
        let map1 = this.add.tilemap('map1');
        let tileSet = map1.addTilesetImage('tilesheet_complete', 'tileSet');
        let topLayer = map1.createStaticLayer('top', [tileSet], 0, 0).setDepth(1);
        let botLayer = map1.createStaticLayer('bottom', [tileSet], 0, 0).setDepth(-1);

        //COLLISION
        this.physics.add.collider(this.player, topLayer);
        this.physics.add.collider(this.zombies, topLayer);
        this.physics.add.collider(this.bullets, topLayer, (bullet) => {
            bullet.destroy();
        });
        topLayer.setCollisionByProperty({collides:true});
        this.physics.add.overlap(this.player, this.zombies, (player, zombie) => {
            zombie.attack(player);
        });
        this.physics.add.overlap(this.bullets, this.zombies, (bullet, zombie) => {
            zombie.damage(34);
            bullet.destroy();
            new Blood(this, zombie.x, zombie.y);
        });

        //TEST ITEMS
        //debugger;
        //this.add.image(200, 200, 'blood');
        let blood = new Blood(this, 200, 200);
    }

    update() {
        //UI UPDATE
        let uiScene = this.game.scene.scenes[1];
        uiScene.updateHealth(this.player.health);

        //MOVEMENT
        this.player.playerMovement();
        this.zombies.getChildren().forEach((zombie) => {
            if (zombie.active) {
                zombie.zombieMovement({x: this.player.x, y: this.player.y});
            }else {
                zombie.destroy();
            }
            zombie.checkDead();
        });

        //PLAYER ATTACK
        if (this.mouse.leftButtonDown()) {
            this.player.attack(this.mouse.isDown, this.bullets);
        }
    }

    gunSwap(context) {
        if (context.key == "1") {
            this.player.setTexture("player");
            this.player.switchGun(null, 0);
        } else if (context.key == "2") {
            this.player.setTexture("playerPistol");
            this.player.switchGun("Pistol", 1000);
        }else if (context.key == "3") {
            this.player.setTexture("playerMachine");
            this.player.switchGun("Machine", 100);
        }
    }

    inventoryToggle() {
        this.scene.sleep('Game');
        this.scene.sleep('UI');
        this.scene.wake('Inventory', this.player)
    }
}