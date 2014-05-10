var count = 0;
var margin = 0;
var score = 0;
var high_score = 0;
var end = false;

function tick() {
	var enemies = $('.enemy');
	enemies.each(function() {
		var left = getLeft(this);
		$(this).css('left', left + 1 + '%');
		thisLeft = getLeft(this);
		playerLeft = getLeft($('#player')[0]);
		thisTop = getTop(this);
		playerTop = getTop($('#player')[0]);
		if (thisLeft > playerLeft - 0.75 && thisLeft < playerLeft + 1 && thisTop > playerTop - 1.5 && thisTop < playerTop + 2) {
			//alert('you lose');
			end = true;	
		}
		if (thisLeft >= 100)
			$(this).remove();
	});
	var v_enemies = $('.v_enemy');
	v_enemies.each(function() {

		var top = getTop(this);
		$(this).css('top', (top + 1) + '%');

		thisLeft = getLeft(this);
		playerLeft = getLeft($('#player')[0]);
		thisTop = getTop(this);
		playerTop = getTop($('#player')[0]);
		if (thisLeft > playerLeft - 0.75 && thisLeft < playerLeft + 1 && thisTop > playerTop - 1.5 && thisTop < playerTop + 2){
			//alert('you lose');
			end = true;
		}
		if (thisTop >= 100)
			$(this).remove();
	});

	count++;
	score++;
	$('#score').html(score);
	if (count == 5) {
		count = 0;

		html = $('body').html();
		//$('body').html(html + '<div class="enemy" style="top: ' + Math.random() * 100 + '%" ></div><div class="v_enemy" style="left: ' + Math.random() * 100 + '%" ></div>');
    // apparently it's easier for the JS to find the style if it's inline...  $('body').html(html +
    $('body').html(html + 
      '<div class="enemy" style="top: ' + Math.random() * 100 + '%; left: 0%;" ></div>' +
      '<div class="v_enemy" style="left: ' + Math.random() * 100 + '%; top: 0%;" ></div>');

		margin += 10;
		margin %= 100;
	}

	if (end) {
		if (score > high_score)
			high_score = score;
		$('body').html('<p id="high_score">high score: ' + high_score + '</p><h1 class="report">your score was ' + score + '</h1><p>press the spacebar to play again.</p>');
	}
	else
		setTimeout("tick()", 50);
}
function getLeft(sprite) {
	var leftString = sprite.style.left;
	var left = parseInt(leftString.substr(0, leftString.length - 1));
	return left;
}
function getTop(sprite) {
	var topString = sprite.style.top;
	var top = parseInt(topString.substr(0, topString.length - 1));
	return top;
}

$(document).ready(function() {
	tick();

	$('#player').click(function() {
		alert('hi');
	});

	$('body').keypress(function(e) {
		if ($('.report').length == 0) {
			switch (e['keyCode']) {
				case 97:
					var left = getLeft($('#player')[0]);
					$('#player').css('left', Math.max(0, left - 2) + "%");
					break;
				case 100:
					var left = getLeft($('#player')[0]);
					$('#player').css('left', Math.min(99, left + 2) + "%");
					break;
				case 119:
					var top = getTop($('#player')[0]);
					$('#player').css('top', Math.max(0, top - 2) + "%");
					break;
				case 115:
					var top = getTop($('#player')[0]);
					$('#player').css('top', Math.min(98, top + 2) + "%");
					break;
			}
		}
		else if (e['keyCode'] == 32) {
      // again, apparently the JS can only find the position in % if it's inline...
			$('body').html('<p id="score">0</p><p id="high_score">high score: ' + high_score + '</p><div id="player" style="left: 50%; top: 50%;"></div>');
			end = false;
			score = 0;
			tick();
		}
	});
});
