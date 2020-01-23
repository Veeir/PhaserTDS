class Meth {
    constructor() {
        {
            this.name = "Meth";
            this.info = "Consumeable: Increase player speed and shooting speed for a short duration.";
        }
    }
    use(player) {
        player.speed += 200;
        player.shootingCooldown -= 500;
        setTimeout(() => {
            player.speed -= 200;
            player.shootingCooldown += 500;
        }, 10000);
    }
}