var Yaris = Yaris || {};

Yaris.MenuState = function() {};

Yaris.MenuState.prototype = {
    create: function() {
        // Background
        this.game.stage.backgroundColor = '#87CEEB';
        var centerX = this.game.world.centerX;
        var centerY = this.game.world.centerY;

        // Title
        this.game.add.text(centerX, 80, "ЯРИС", {
            font: "72px Arial",
            fill: "#FF6B00",
            align: "center",
            fontWeight: "bold"
        }).anchor.set(0.5);

        this.game.add.text(centerX, 150, "ловит ТРАФИК с ДОРОВ", {
            font: "36px Arial",
            fill: "#333333",
            align: "center"
        }).anchor.set(0.5);

        // Description
        this.game.add.text(centerX, 220, "Помогите Ярису ловить биткойны!", {
            font: "24px Arial",
            fill: "#666666",
            align: "center"
        }).anchor.set(0.5);

        this.game.add.text(centerX, 260, "Стрелки или A/D для движения Яриса", {
            font: "16px Arial",
            fill: "#999999",
            align: "center"
        }).anchor.set(0.5);

        this.game.add.text(centerX, 300, "W/S или стрелки вверх/вниз для корзины", {
            font: "16px Arial",
            fill: "#999999",
            align: "center"
        }).anchor.set(0.5);

        // Start button
        var startButton = this.game.add.text(centerX, centerY + 120, "НАЧАТЬ ИГРУ", {
            font: "36px Arial",
            fill: "#FFFFFF",
            align: "center",
            fontWeight: "bold"
        });
        startButton.anchor.set(0.5);
        startButton.inputEnabled = true;
        startButton.events.onInputOver.add(function() {
            startButton.fill = "#FFD700";
        }, this);
        startButton.events.onInputOut.add(function() {
            startButton.fill = "#FFFFFF";
        }, this);
        startButton.events.onInputDown.add(this.startGame, this);

        // Background for button
        var buttonBg = this.game.add.graphics(centerX - 150, centerY + 90);
        buttonBg.beginFill(0xFF6B00, 0.8);
        buttonBg.drawRoundedRect(0, 0, 300, 60, 15);
        buttonBg.endFill();
        startButton.bringToTop();

        // Info
        this.game.add.text(centerX, this.game.world.height - 40, "SEO агентство Marketsek | Больше трафика = больше биткойнов! 💰", {
            font: "14px Arial",
            fill: "#666666",
            align: "center"
        }).anchor.set(0.5);
    },
    startGame: function() {
        this.game.state.start('Game');
    },
    update: function() {}
};