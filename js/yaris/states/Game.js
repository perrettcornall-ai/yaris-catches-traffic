var Yaris = Yaris || {};

Yaris.GameState = function() {
    'use strict';
    this.sprites = {};
    this.score = new Yaris.Score(this);
    this.wolf = new Yaris.Wolf(this);
    this.bitcoins = new Yaris.Bitcoins(this);
    this.newBitcoinTimer = 0;
    this.bitcoinMoveTimer = 0;
    this.lastDisplayedScore = -1;
    this.lastDisplayedLevel = -1;
};

Yaris.GameState.prototype = {
    create: function() {
        'use strict';
        this.game.stage.backgroundColor = '#87CEEB';
        this.bitcoins.clear();

        // Create sprites
        var spritesData = [
            ['wolf-left', 'wolf-left', 390, 380],
            ['basket-left-up', 'basket-left-up', 350, 360],
            ['basket-left-down', 'basket-left-down', 350, 420],
            ['wolf-right', 'wolf-right', 520, 380],
            ['basket-right-up', 'basket-right-up', 570, 360],
            ['basket-right-down', 'basket-right-down', 570, 420],
            ['bitcoin-left-up-1', 'bitcoin-1', 250, 200],
            ['bitcoin-left-up-2', 'bitcoin-2', 260, 210],
            ['bitcoin-left-up-3', 'bitcoin-3', 270, 220],
            ['bitcoin-left-up-4', 'bitcoin-4', 280, 230],
            ['bitcoin-left-up-5', 'bitcoin-5', 290, 240],
            ['bitcoin-left-down-1', 'bitcoin-1', 250, 440],
            ['bitcoin-left-down-2', 'bitcoin-2', 260, 430],
            ['bitcoin-left-down-3', 'bitcoin-3', 270, 420],
            ['bitcoin-left-down-4', 'bitcoin-4', 280, 410],
            ['bitcoin-left-down-5', 'bitcoin-5', 290, 400],
            ['bitcoin-right-up-1', 'bitcoin-1', 710, 200],
            ['bitcoin-right-up-2', 'bitcoin-2', 700, 210],
            ['bitcoin-right-up-3', 'bitcoin-3', 690, 220],
            ['bitcoin-right-up-4', 'bitcoin-4', 680, 230],
            ['bitcoin-right-up-5', 'bitcoin-5', 670, 240],
            ['bitcoin-right-down-1', 'bitcoin-1', 710, 440],
            ['bitcoin-right-down-2', 'bitcoin-2', 700, 430],
            ['bitcoin-right-down-3', 'bitcoin-3', 690, 420],
            ['bitcoin-right-down-4', 'bitcoin-4', 680, 410],
            ['bitcoin-right-down-5', 'bitcoin-5', 670, 400]
        ];

        for (var i = 0; i < spritesData.length; i++) {
            this.sprites[spritesData[i][0]] = this.game.add.sprite(
                spritesData[i][2], spritesData[i][3], spritesData[i][1]);
            this.sprites[spritesData[i][0]].kill();
        }

        // Score text
        this.scoreText = this.game.add.text(20, 20, 'БИТКОЙНЫ: 0', {
            font: '32px Arial',
            fill: '#FFD700',
            fontWeight: 'bold'
        });
        this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        // Level text
        this.levelText = this.game.add.text(20, 60, 'УРОВЕНЬ: 1', {
            font: '24px Arial',
            fill: '#FF6B00',
            fontWeight: 'bold'
        });
        this.levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 3);

        // Missed bitcoins display
        this.missedText = this.game.add.text(this.game.world.width - 200, 20, 'ПРОПУЩЕНО: 0/3', {
            font: '24px Arial',
            fill: '#FF0000',
            fontWeight: 'bold'
        });
        this.missedText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 3);

        // Input handling
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.W, Phaser.Keyboard.S,
            Phaser.Keyboard.A, Phaser.Keyboard.D]);

        this.wolf.render();
    },

    update: function() {
        'use strict';

        // Handle input
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ||
            this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.wolf.moveWolfLeft();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ||
            this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.wolf.moveWolfRight();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) ||
            this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            this.wolf.moveBasketUp();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ||
            this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            this.wolf.moveBasketDown();
        }

        // Add new bitcoin
        this.newBitcoinTimer++;
        var newBitcoinInterval = Math.max(30 - this.score.level * 2, 8);
        if (this.newBitcoinTimer > newBitcoinInterval) {
            if (this.bitcoins.addNewBitcoin()) {
                this.newBitcoinTimer = 0;
            }
        }

        // Move bitcoins
        this.bitcoinMoveTimer++;
        if (this.bitcoinMoveTimer > 12) {
            var bitcoin = this.bitcoins.nextBitcoin;
            var i = 0;
            while (bitcoin && i < this.bitcoins.length) {
                if (!bitcoin.data.move()) {
                    break;
                }
                bitcoin = bitcoin.next;
                i++;
            }
            this.bitcoinMoveTimer = 0;
        }

        // Update score display
        if (this.score.savedBitcoins !== this.lastDisplayedScore) {
            this.scoreText.setText('БИТКОЙНЫ: ' + this.score.savedBitcoins);
            this.lastDisplayedScore = this.score.savedBitcoins;
        }

        if (this.score.level !== this.lastDisplayedLevel) {
            this.levelText.setText('УРОВЕНЬ: ' + (this.score.level + 1));
            this.lastDisplayedLevel = this.score.level;
        }

        // Update missed display
        this.missedText.setText('ПРОПУЩЕНО: ' + this.score.missedBitcoins + '/3');
    },

    endGame: function() {
        var centerX = this.game.world.centerX;
        var centerY = this.game.world.centerY;

        this.game.paused = true;

        var gameOverBg = this.game.add.graphics(0, 0);
        gameOverBg.beginFill(0x000000, 0.9);
        gameOverBg.drawRect(0, 0, this.game.width, this.game.height);
        gameOverBg.endFill();

        var gameOverText = this.game.add.text(centerX, centerY - 80, "КОНЕЦ ИГРЫ", {
            font: "60px Arial",
            fill: "#FFD700",
            fontWeight: "bold"
        });
        gameOverText.anchor.set(0.5);
        gameOverText.setShadow(3, 3, 'rgba(0,0,0,0.8)', 5);

        var scoreText = this.game.add.text(centerX, centerY - 10, "Собрано биткойнов: " + this.score.savedBitcoins, {
            font: "36px Arial",
            fill: "#FFFFFF"
        });
        scoreText.anchor.set(0.5);

        var levelText = this.game.add.text(centerX, centerY + 40, "Уровень достигнут: " + (this.score.level + 1), {
            font: "28px Arial",
            fill: "#FFFFFF"
        });
        levelText.anchor.set(0.5);

        var retryButton = this.game.add.text(centerX, centerY + 120, "ИГРАТЬ СНОВА", {
            font: "28px Arial",
            fill: "#FFFFFF",
            fontWeight: "bold"
        });
        retryButton.anchor.set(0.5);
        retryButton.inputEnabled = true;
        retryButton.events.onInputOver.add(function() {
            retryButton.fill = "#FFD700";
        }, this);
        retryButton.events.onInputOut.add(function() {
            retryButton.fill = "#FFFFFF";
        }, this);
        retryButton.events.onInputDown.add(function() {
            this.game.paused = false;
            this.game.state.start('Menu');
        }, this);
    }
};