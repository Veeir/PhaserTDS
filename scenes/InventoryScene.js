class InventoryScene extends Phaser.Scene {
    constructor() {
        super({key: "Inventory", active : true});
        this.wake = this.wake.bind(this);
        this.inventoryView = [];
        this.inventory = [];
        this.selectedItem = null;
    }

    preload() {
        this.load.image('Select', '../assets/select.png');
    }

    create() {
        this.scene.sleep('Inventory');

        //Sprites
        this.activeItemIndicator = this.add.image(-10,-10, 'Select');
        //Events
        this.events.on('wake', this.wake);
        this.input.keyboard.on('keydown-I', this.inventoryToggle, this);

        //Inventory
        this.useButton = this.add.text(400, 500, "Use Item");
        this.useButton.setOrigin(0.5, 0.5);
        this.setTextEvents(this.useButton);
        this.useButton.on('pointerdown', () => {
            if (this.activeItem) {
                this.player.useItem(this.activeObject);
            }
        });
    }

    wake(scene, player) {
        this.player = player;
        this.inventory = player.inventory;
        console.log(this.inventory);
        let startX = 400;
        let startY = 100;

        for (let i=0; i<this.inventory.length; i++) {
            let text = this.add.text(startX, startY,
                 `${this.inventory[i].name}`);
            this.setTextEvents(text); 
            this.setItemClick(this.inventory[i], text); 
            this.inventoryView.push(text);          
            startY += 30;
        }
    }

    update(){
        if (this.activeItem) {
            this.activeItemIndicator
                .setPosition(this.activeItem.x - 25, this.activeItem.y + 7);
        }
    }

    inventoryToggle() {
        this.scene.sleep('Inventory');
        this.scene.wake('UI');
        this.scene.wake('Game');
        this.clearInventory();
    }

    setTextEvents(text) {
        text.setInteractive();
        text.on('pointerover', () => {
            text.setColor('#f00');
        });
        text.on('pointerout', () => {
            text.setColor('#fff');
        });
    }

    setItemClick(item, text) {
        text.on('pointerdown', () => {
            if (this.activeItem == text) {
                this.activeItem = null;
                this.activeObject = null;
            }else {
                this.activeItem = text;
                this.activeObject = item;
            }
        });
    }

    clearInventory() {
        for (let i=0; i<this.inventoryView.length; i++) {
            this.inventoryView[i].destroy(true);
        }
    }
}