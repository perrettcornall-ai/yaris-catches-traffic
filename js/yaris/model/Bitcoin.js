var Yaris = Yaris || {};

Yaris.Bitcoin = function(state, horizontal, vertical) {
    'use strict';
    this.horizontal = horizontal;
    this.vertical = vertical;
    
    this.route = 'bitcoin-' 
            + (this.horizontal ? 'right' : 'left')
            + '-' 
            + (this.vertical ? 'up' : 'down');
    
    this.step = 1;
    this.state = state;
    
    this.state.sprites[this.route + '-' + this.step].reset(
            this.state.sprites[this.route + '-' + this.step].x,
            this.state.sprites[this.route + '-' + this.step].y
            );
};

Yaris.Bitcoin.prototype = {
    move: function() {
        'use strict';
        
        if (this.step < 5) {
            var newSprite = this.state.sprites[this.route + '-' + (this.step + 1)];
            
            if (!newSprite.alive) {
                this.state.sprites[this.route + '-' + this.step].kill();
                this.step++;
                newSprite.reset(newSprite.x, newSprite.y);
                return true;
            } else {
                return false;
            }
        } else {
            this.state.sprites[this.route + '-' + this.step].kill();
            this.state.bitcoins.remove(this);
            
            if ((this.state.wolf.getBasketPosition() === this.vertical) 
                    && (this.state.wolf.getWolfPosition() === this.horizontal)) 
            {
                this.state.score.bitcoinCaught();
            } else {
                this.state.score.bitcoinMissed();
            }
            return true;
        }
    }
};