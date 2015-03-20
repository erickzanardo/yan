(function($) {
    $(document).ready(function() {
        $('#url-bar').focus();

        $('.tab-panel').on('click', '.tab-button', function() {
            var me = $(this);
            if (!me.is('.pixel-button-primary')) {
                var i = me.index();
                var tabPanel = $('.tab-panel');
                tabPanel.find('.pixel-button-primary').removeClass('pixel-button-primary');
                me.addClass('pixel-button-primary');

                var pagePanel = $('.page-panel');
                pagePanel.find('iframe:visible').hide();
                
                var iframe = pagePanel.find('iframe').eq(i);
                iframe.show();
                iframe.focus();

                $('#url-bar').val(iframe.attr('src'));
            }
        });

        $('.new-tab').click(function() {
            $('#url-bar').val('');
            $('#url-bar').focus();
            $('.tab-panel .pixel-button-primary').removeClass('pixel-button-primary');
            $('.page-panel iframe:visible').hide();
        });

        $('#url-bar').keyup(function(e) {
           var which = e.which;
           var me = $(this);
           // ENTER
           if (which == 13) {
                // Creates the tab button
                var tabPanel = $('.tab-panel');
                var pagePanel = $('.page-panel');

                var tab = $('<button class="pixel-button pixel-button-primary tab-button">Loading</button>');
                var selectedTab = tabPanel.find('.pixel-button-primary');

                var url = me.val();
                var iframe;
                if (!selectedTab.length) {
                    selectedTab.removeClass('pixel-button-primary');
                    tabPanel.find('.new-tab').before(tab);
    
                    // Creates the iframe
                    pagePanel.find('iframe:visible').hide();
                    if (url.indexOf('http') !== 0) {
                        url = 'http://' + url;
                    }

                    iframe = $('<iframe nwdisable nwfaketop></iframe>');
                    pagePanel.append(iframe);
                    iframe.load(function() {
                        var me = $(this);
                        var contents = me.contents();

                        var title = contents.find( "title").html();
                        tab.text(title);

                        contents.keydown(function(e) { shortcutHandler(e.which, true); });
                        contents.keyup(function(e) { shortcutHandler(e.which, false); });
                    });
                } else {
                    selectedTab.text('Loading...');
                    iframe = pagePanel.find('iframe').eq(selectedTab.index());
                }
                iframe.attr('src', url);
           }
        });
    });
})(jQuery);