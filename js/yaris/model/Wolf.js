var Yaris = Yaris || {};

Yaris.Wolf = function(state, basketPosition, wolfPosition) {
    'use strict';

    if (typeof basketPosition == 'undefined') {
        basketPosition = false;
    }
    if (typeof wolfPosition == 'undefined') {
        wolfPosition = false;
    }

    this.state = state;
    this.basketPosition = basketPosition;
    this.wolfPosition = wolfPosition;
};

Yaris.Wolf.prototype = {
    render: function() {
        'use strict';
        var wolfStringPosition = (this.wolfPosition ? 'right' : 'left');
        var basketStringPosition = (this.basketPosition ? 'up' : 'down');
        
        this.state.sprites['wolf-' + wolfStringPosition].reset(
                this.state.sprites['wolf-' + wolfStringPosition].x,
                this.state.sprites['wolf-' + wolfStringPosition].y
                );
        
        this.state.sprites['basket-' + wolfStringPosition + '-' + basketStringPosition].reset(
                this.state.sprites['basket-' + wolfStringPosition + '-' + basketStringPosition].x,
                this.state.sprites['basket-' + wolfStringPosition + '-' + basketStringPosition].y
                );
    },

    moveWolfLeft: function() {
        'use strict';
        if (this.wolfPosition) {
            this.move('wolf-right', 'wolf-left');
            if (this.basketPosition) {
                this.move('basket-right-up', 'basket-left-up');
            } else {
                this.move('basket-right-down', 'basket-left-down');
            }
            this.wolfPosition = false;
        }
    },

    moveWolfRight: function() {
        'use strict';
        if (!this.wolfPosition) {
            this.move('wolf-left', 'wolf-right');
            if (this.basketPosition) {
                this.move('basket-left-up', 'basket-right-up');
            } else {
                this.move('basket-left-down', 'basket-right-down');
            }
            this.wolfPosition = true;
        }
    },

    moveBasketUp: function() {
        'use strict';
        if (!this.basketPosition) {
            var wolfStringPosition = (this.wolfPosition ? 'right' : 'left');
            this.move('basket-' + wolfStringPosition + '-down', 'basket-' + wolfStringPosition + '-up');
            this.basketPosition = true;
        }
    },

    moveBasketDown: function() {
        'use strict';
        if (this.basketPosition) {
            var wolfStringPosition = (this.wolfPosition ? 'right' : 'left');
            this.move('basket-' + wolfStringPosition + '-up', 'basket-' + wolfStringPosition + '-down');
            this.basketPosition = false;
        }
    },

    move: function(killSprite, resetSprite) {
        'use strict';
        this.state.sprites[killSprite].kill();
        this.state.sprites[resetSprite].reset(
                this.state.sprites[resetSprite].x,
                this.state.sprites[resetSprite].y
                );
    },

    getWolfPosition: function() {
        'use strict';
        return this.wolfPosition;
    },

    getBasketPosition: function() {
        'use strict';
        return this.basketPosition;
    }
};