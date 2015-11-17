var allQuotes = [
  'Get your facts first then you can distort them as you please',
  'The secret of getting ahead is getting started',
  'All generalizations are false including this one',
  'If you tell the truth you dont have to remember anything',
  'The best way to cheer yourself up is to try to cheer somebody else up',
  'Wrinkles should merely indicate where smiles have been',
  'The lack of money is the root of all evil',
  'There is no sadder sight than a young pessimist',
  'I can live for two months on a good compliment',
  'Against the assault of laughter nothing can stand',
  'Humor is mankinds greatest blessing',
  'Facts are stubborn, but statistics are more pliable',
  'I make it a rule never to smoke while Im sleeping',
  'Sometimes too much to drink is barely enough',
  'A person with a new idea is a crank until the idea succeeds',
  'It is easier to stay out than get out',
  'I have never let my schooling interfere with my education',
  'Education consists mainly of what we have unlearned',
  'We have the best government that money can buy',
  'Familiarity breeds contempt and children',
  'A man cannot be comfortable without his own approval',
  'The man who does not read has no advantage over the man who cannot read',
  'Never tell the truth to people who are not worthy of it',
  'God created war so that Americans would learn geography',
  'Books are for people who wish they were somewhere else',
  'Sanity and happiness are an impossible combination',
  'The worst loneliness is to not be comfortable with yourself',
  'History doesnt repeat itself but it does rhyme',
  'A clear conscience is the sure sign of a bad memory',
  'To get the full value of joy you must have someone to divide it with',
  'Action speaks louder than words but not nearly as often',
  'A half truth is the most cowardly of lies',
  'Worrying is like paying a debt you dont owe',
  'Its easy to make friends but hard to get rid of them',
  'A gentleman is someone who knows how to play the banjo and doesnt',
  'Distance lends enchantment to the view',
  'Religion was invented when the first con man met the first fool',
  'Man was made at the end of the weeks work when God was tired',
  'I do not like work even when someone else is doing it',
  'Humor is tragedy plus time',
  'An honest politician is an oxymoron',
  'Never let the truth get in the way of a good story',
  'I wonder if God created man because He was disappointed with the monkey',
  'Whoever is happy will make others happy too',
  'There is no such thing as an ordinary life',
  'To a man with a hammer everything looks like a nail',
  'The secret of success is making your vocation your vacation',
  'Continuous improvement is better than delayed perfection',
  'Additional problems are the offspring of poor solutions',
  'Dont use a five dollar word when a fifty cent word will do',
  'Children and fools always speak the truth',
  'Find a job you enjoy doing and you will never have to work a day in your life',
  'The coldest winter I ever spent was a summer in San Francisco',
  'Many a small thing has been made large by the right kind of advertising',
  'Faith is believing what you know aint so',
  'Never put off until tomorrow what you can do the day after tomorrow',
  'No man is a failure who has friends',
  'Part of the secret of success in life is to eat what you want',
  'I like criticism but it must be my way',
  'Repartee is something we think of twenty four hours too late',
  'Prosperity is the best protector of principle',
  'Of all the animals man is the only one that lies',
  'Supposing is good but finding out is better',
  'A consciously exaggerated compliment is an offense',
  'Never attribute to malice what can be adequately explained by stupidity',
  'It takes three weeks to prepare a good ad lib speech'
];


function init() {

  // Hide "play" button
  $('#play').hide();
  

  // Show the "help" and "new game" buttons
  $('#show-help').show();
  $('#newgame').show();
  

  // Clear the win screen
  $('#quote').html('');
  

  // Clear the game canvas
  $('#canvas').html('');


  // Select a random quote and save to variable "quote"
  var quote = allQuotes[ Math.floor( Math.random() * allQuotes.length ) ]; 


  // Append the quote to the "win" div
  $('#quote').html('"'+quote+'"');
  

  // Return the quote as an array of letters and spaces
  var splitQuote = quote.split('');
  

  // Length of splitQuote array must be evenly divisible by 5. 
  // If not, add blank spaces to either end of it until it is
  while ( splitQuote.length %5 !==0 ) {
    splitQuote.push(' ');
    if ( splitQuote.length %5 === 0 ) { break; }
    else { splitQuote.unshift(' '); }
  }
  

  // Slice the splitQuote array into five even pieces
  var row1 = splitQuote.slice( 0, splitQuote.length * .20 ),
      row2 = splitQuote.slice( splitQuote.length * .20, splitQuote.length * .4 ),
      row3 = splitQuote.slice( splitQuote.length * .4, splitQuote.length * .6 ),
      row4 = splitQuote.slice( splitQuote.length * .6, splitQuote.length * .8 ),
      row5 = splitQuote.slice( splitQuote.length * .8 );
  

  // Create columns of divs and append them to the canvas. Columns have a free holder div
  // at the top and five holders below, populated with tiles containing letters from the 
  // that contain tile divs. Tile divs contain letters taken from the splitQuote array
  for( i=0; i<splitQuote.length*.20; i++ ) {
    $('#canvas').append('<div class="column"><div class="tile_holder free"></div><div class="tile_holder"><div class="tile">' + row1[i] + '</div></div><div class="tile_holder"><div class="tile">' + row2[i] + '</div></div><div class="tile_holder"><div class="tile">' + row3[i] + '</div></div><div class="tile_holder"><div class="tile">' + row4[i] + '</div></div><div class="tile_holder"><div class="tile">' + row5[i] + '</div></div></div>');
  }
  
     
  // At this point, all of the letter tiles are in their proper position. 
  // Loop through all of the holder divs and add data to them that indicates
  // which letter tile belongs in it. If the tile div contains no letter, add a 
  // class of "dark" to the holder and a class of "blank" to the tile. Otherwise,
  // add a class of "in_play" to the holder and a class of "letter" to the tile.
  $('.tile_holder').not('.free').each( function() {
    var holder = $(this);
    holder.data( 'correctTile', holder.children().text() ); 
    if( holder.children().text() == ' ' ) {
      holder.addClass('dark');
      holder.children().addClass('blank'); 
    } 
    else { 
      holder.addClass('in_play');
      holder.children().addClass('letter'); 
    }
  });
  

  // Shuffle the tile divs
  $('.column').each( function(){
    $(this).find('.letter').shuffle();
  });


  // After the shuffle, loop through all of the "in_play" holders
  // and see how many now contain the correct tile. Add a class of
  // "right" to the tiles that are in their correct spot
  $('.in_play').each( function(){
    var holder = $(this);
    var tile = $(this).children();
    if( holder.data('correctTile') == tile.text() ) { tile.addClass('right'); }
  });
  

  // Make tile divs draggable
  $('.letter').each( function() {
    $(this).draggable({
      containment: $(this).parent().parent(),
      axis: 'y',
      cursor: 'pointer',
      zIndex: 5000,
      revert: 'invalid',
      revertDuration: 200
    });
  });


  // Make holder divs droppable
  $('.tile_holder').droppable({
    accept: '.letter',
    tolerance: 'touch',
    drop: function(event, ui) {
      var dropped = ui.draggable;
      var droppedOn = $(this);
      
      // When a tile is dropped in a holder, the holder is no longer
      // droppable. Re-enable droppable when the holder is free
      droppedOn.droppable('disable');            
      dropped.parent().droppable('enable');
      dropped.detach().appendTo(droppedOn);      
      ui.draggable.position({ of:$(this), my:'center', at:'center' });
      
      // Whenever a tile is dropped, add or remove the class of "right" 
      // and check how many "right" tiles there are. If the number of 
      // right tiles = the number of letter tiles, show the "win" div
      if( dropped.text() == droppedOn.data('correctTile') ){
        dropped.addClass('right');              
      }                                         
      else { dropped.removeClass('right'); }
      if( $('.letter').length == $('.right').length ) { 
        console.log('win!');
        $('[data-remodal-id=winscreen]').remodal().open();
      }
    } 
  });
  

  // Any holder that's not empty is not droppable
  $('.tile_holder').not('.tile_holder:empty').droppable('disable');


  // Center the game canvas
  var columnCount = $('#canvas').find('.column').length;
  var canvasWidth = columnCount * 64;
  $('#canvas').css({
    'width' : canvasWidth
  });

} // end of init function


$(function(){

  $('#show-help').hide();
  $('#newgame').hide();
  $('.game-init').click(init);
 
});
