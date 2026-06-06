var Yaris = Yaris || {};

Yaris.Score = function(state) {
    'use strict';
    this.state = state;
    this.level = 0;
    this.savedBitcoins = 0;
    this.missedBitcoins = 0;
};

Yaris.Score.prototype = {
    bitcoinCaught: function() {
        'use strict';
        this.savedBitcoins++;
        
        if (!(this.savedBitcoins % 5)) {
            this.level++;
        }
    },

    bitcoinMissed: function() {
        'use strict';
        this.missedBitcoins++;
        
        if (this.missedBitcoins >= 3) {
            this.state.endGame();
        }
    }
};