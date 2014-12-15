$(function() 
{
    // Menu Initialization
    var $menu = $('#menu');
    var $menuEntries = $menu.children('div');
    var $playIframe = $('#play iframe');
	
    $(window).on('hashchange', function() 
	{
        $menuEntries.hide();
		
        var clickedMenuEntry = $menuEntries.filter(window.location.hash).size() ? window.location.hash : '#index';

        $(clickedMenuEntry).show();
		
    })
	
	.trigger('hashchange');
});

$(window).load(function() {
    var curBackground = 1;
    var backgroundsCount = 6;
    var backgroundsExt = '.jpg';
    var backgroundsUrlPrefix = 'img/backgrounds/';
	
    // Images Preloading
    for (var i = curBackground; i <= backgroundsCount; i++) 
	{
        $('<img src="' + backgroundsUrlPrefix + i + backgroundsExt + '">');
    }

    var $backgroundContainer = $('#background');

    // Background Image Cycling
    setInterval(function() 
	{
        $backgroundContainer.fadeOut('slow', function() 
		{
            $backgroundContainer.css( 'background-image', 'url(' + backgroundsUrlPrefix + curBackground + backgroundsExt + ')').fadeIn(3000);
        });
		
        curBackground = (curBackground === backgroundsCount) ? 1 : ++curBackground;
		
    }, 10000);

    var $body = $('body');
    var $content = $('#content');

    var playNextTrack = function() 
	{
        var track = tracks[Math.floor(Math.random() * tracks.length)];

        SC.stream
		(
            track.uri,
            { 
				onfinish: 
				playNextTrack, autoPlay: true, html5only: true }, function(track) { currentTrack = track; 
			}
        );
		
        $playerTitle.attr('href', track.permalink_url).text(track.title);
    };
	
    var currentTrack = { 
		togglePause: 
		playNextTrack 
	};
});
