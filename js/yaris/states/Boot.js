var Yaris = Yaris || {};

Yaris.BootState = function() {};

Yaris.BootState.prototype = {
    preload: function() {
        // Loading assets for PreloadState
        this.game.load.image('loader-empty', './assets/sprites/loader-empty.png');
        this.game.load.image('loader-full', './assets/sprites/loader-full.png');
    },
    create: function() {
        // Set scaling mode and resize game
        this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        this.game.stage.scale.refresh();
        
        // Background
        this.game.stage.backgroundColor = '#87CEEB';
        
        this.game.state.start('Preload');
    },
    update: function() {}
};