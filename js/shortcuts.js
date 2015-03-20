(function($) {
    var codes = {
        BACKSPACE: 8,
        CONTROL: 17,
        ALT: 18,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        W: 87,
        T: 84,
        L: 76
    };

    var shortcuts = [];
    
    var registerShortcut = function(keys, handler) {
        var key = keys.shift();
        var shortcut = {
            key: key,
            requires: keys,
            handler: handler
        };
        shortcuts.push(shortcut);
    };

    var keys = [];
    shortcutHandler = function(key, pressed) {
        keys[key] = pressed;
        if (pressed) {
            for (var i = 0; i < shortcuts.length; i++) {
                var shortcut = shortcuts[i];
                if (keys[shortcut.key]) {
                    var run = true;
                    for (var j = 0; j < shortcut.requires.length; j++) {
                        var requireKey = shortcut.requires[j];
                        if (!keys[requireKey]) {
                            run = false;
                            break;
                        }
                    }
                    if (run) {
                        shortcut.handler();
                        for (var j = 0; j < shortcut.requires.length; j++) {
                            var requireKey = shortcut.requires[j];
                            keys[requireKey] = false;
                        }
                    }
                }
            }
        }
    };

    // Shortcuts
    registerShortcut([codes.CONTROL, codes.W], function() {
        var current = $('.tab-panel .pixel-button-primary');

        var next = current.next('.tab-button');
        var toSelect = next.length ? next : current.prev('.tab-button');

        $('.page-panel iframe:visible').remove();
        current.remove();
        $('#url-bar').val('');

        if (toSelect.length) {
            toSelect.click();
        } else {
            $('#url-bar').focus();
        }
    });

    registerShortcut([codes.CONTROL, codes.T], function() {
        $('.new-tab').click();
    });
    
    registerShortcut([codes.CONTROL, codes.RIGHT], function() {
        $('.tab-panel .pixel-button-primary').next('.tab-button').click();
    });

    registerShortcut([codes.CONTROL, codes.LEFT], function() {
        $('.tab-panel .pixel-button-primary').prev('.tab-button').click();
    });
})(jQuery);