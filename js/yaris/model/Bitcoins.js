var Yaris = Yaris || {};

Yaris.Bitcoins = function(state) {
    'use strict';
    this.state = state;
    this.length = 0;
    this.head = null;
    this.nextBitcoin = null;
};

Yaris.Bitcoins.prototype = {
    add: function(bitcoin) {
        'use strict';
        var node = {
            data: bitcoin,
            next: null
        };
        
        if (!this.head) {
            this.head = node;
            this.nextBitcoin = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.length++;
    },

    remove: function(bitcoin) {
        'use strict';
        if (this.length > 0) {
            var current = this.head;
            var previous;
            
            while (current.data !== bitcoin) {
                previous = current;
                current = current.next;
            }
            
            if (previous) {
                previous.next = current.next;
            } else {
                this.head = current.next;
            }
            
            if (current === this.nextBitcoin) {
                if (current.next) {
                    this.nextBitcoin = current.next;
                } else {
                    this.nextBitcoin = this.head;
                }
            }
            this.length--;
        }
    },

    addNewBitcoin: function() {
        'use strict';
        var horizontal = (Math.random() > 0.5) ? true : false;
        var vertical = (Math.random() > 0.5) ? true : false;
        
        var bitcoin = new Yaris.Bitcoin(this.state, horizontal, vertical);
        this.add(bitcoin);
        return true;
    },

    clear: function() {
        'use strict';
        this.length = 0;
        this.head = null;
        this.nextBitcoin = null;
    }
};