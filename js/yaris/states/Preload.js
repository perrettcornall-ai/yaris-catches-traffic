var Yaris = Yaris || {};

Yaris.PreloadState = function() {};

Yaris.PreloadState.prototype = {
    preload: function() {
        // Loading screen
        var centerX = this.game.world.centerX;
        var centerY = this.game.world.centerY;

        // Title
        this.game.add.text(centerX, centerY - 100, "ЯРИС ловит ТРАФИК", {
            font: "48px Arial",
            fill: "#333333",
            align: "center"
        }).anchor.set(0.5);

        this.game.add.text(centerX, centerY - 40, "с ДОРОВ", {
            font: "32px Arial",
            fill: "#666666",
            align: "center"
        }).anchor.set(0.5);

        // Loader bar
        this.game.add.sprite(centerX - 101, centerY + 50, 'loader-empty');
        this.loaderFull = this.game.add.sprite(centerX - 101, centerY + 50, 'loader-full');
        this.loaderFull.cropEnabled = true;
        this.loaderFull.crop = new Phaser.Rectangle(0, 0, 0, this.loaderFull.height);

        // Loading images
        var imagesData = [
            'wolf-left',
            'wolf-right',
            'basket-left-up',
            'basket-left-down',
            'basket-right-up',
            'basket-right-down',
            'bitcoin-1',
            'bitcoin-2',
            'bitcoin-3',
            'bitcoin-4',
            'bitcoin-5',
            'start-button'
        ];

        for (var i = 0; i < imagesData.length; i++) {
            this.game.load.image(imagesData[i],
                    './assets/sprites/' + imagesData[i] + '.png');
        }
    },
    update: function() {
        // Update loader
        if (this.loaderFull) {
            var width = Math.floor((this.load.progress * 202));
            this.loaderFull.crop.width = width;
            this.loaderFull.crop = this.loaderFull.crop;
        }
    },
    create: function() {
        this.game.state.start('Menu');
    }
};