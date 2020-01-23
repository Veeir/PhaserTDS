class UI extends Phaser.Scene {
    constructor() {
        super({key: "UI", active : true});
    }

    create() {
        this.healthText = this.add.text(20, 20, `Health: ${100}`);
        this.healthText.setStyle({
            fontsize: '128px',
            fontFamily: 'Consolas',
            color: '#ff0000',
            backgroundColor: 'black'
        });
        this.healthText.set
    }


    updateHealth(health) {
        this.healthText.setText(`Health: ${health}`);
    }
}