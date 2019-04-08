<?php
/*	App - BCrypt Hashing
 *	Function: Hashes an input.
 *	Version: $version
 *	Future Features: Option to use salt, Node.js
 * 	php, js
 */
$version = '20181226';

if ( isset($_POST['unhashed']) ) {
	echo password_hash($_POST['unhashed'], PASSWORD_DEFAULT);
} else {
?>
<!doctype html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>App - BCrypt Hashing</title>
	<link href="https://www.favicon.cc/logo3d/908785.png" rel="icon"/>
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
  <style type="text/less">
    @import "commons.less";
    body {
      .fullScreen();
      background: linear-gradient(-15deg, #390E9F, #7E2E9F);
      font-family: "Roboto", Arial, sans-serif;
      font-weight: 400;
    }

    main {
      .fullSize();
      .flexCenter();
      padding: 20px;
    }

    .modal {
      .maxWidth(510px);;
      filter: drop-shadow(3px 3px 3px fadeout(black, 84%));
    }

    @modal-border: 28px;

    .modal-heading-container {
      width: 100%;
      height: 60px;
      position: relative;
      padding: 0 20px;
      background: linear-gradient(70deg, #2DBBAD, #43CB94);
      border-top-left-radius: @modal-border;
      border-top-right-radius: @modal-border;
      box-shadow: 0 1px 3px fadeout(black, 84%);
      .flexCenterY();
      color: white;
      font-size: 18px;

      p {
        margin-top: 6px;
      }
    }

    .modal-content {
      width: 100%;
      padding: 20px;
			padding-bottom: 0;
      background-color: white;
      border-bottom-left-radius: @modal-border;
      border-bottom-right-radius: @modal-border;
    }

    @azure: #070D61;

    .input-container {
      width: 100%;
      margin-bottom: 20px;
    }

    .modal-text {
      width: 100%;
      font-size: 16px;
      color: @azure;
      margin-bottom: 20px;

			p {
				margin-bottom: 8px;

				&:last-child {
					margin-bottom: 0;
				}
			}

			.small {
				font-size: 12px;
			}
    }

    @input-wrapper-gap: 20px;

    .input-container {
      /* .break(@input-wrapper-gap, 1); */
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .input-wrapper {
      .break(@input-wrapper-gap, 0);
      width: @break;
      height: 40px;
      background-color: #E6E6E6;
      margin-right: @input-wrapper-gap;
      border-radius: 8px;
			overflow: hidden;
      .flexCenterY();
      font-size: 14px;
      color: @azure;

      .input {
        .fullSize();
        padding: 0 15px;
				.flexCenterY();
      }
    }

    .button {
      .square(40px);
      .flexCenter();
      background-color: #45CFC1;
      border-radius: 10px;

      svg {
      	*:not(rect) {
      	  fill: white;
	      }
			}
    }

		#hashed-container {
			overflow: hidden;
			max-height: 0;
		}

		#hash_button {
			svg {
				position: absolute;
			}
		}

		#phpHash {
			#icon-lock {
				opacity: : 1;
			}
			#icon-reload {
				opacity: 0;
			}

			&.hashed {
				#icon-lock {
					opacity: 0;
				}
				#icon-reload {
					opacity: 1;
				}
			}
		}

    footer {
      width: 100%;
      position: fixed;
      bottom: 20px;
      .flexCenterX();
      color: white;
      font-weight: 300;
    }

  </style>
	<style>
		/* JavaScript Disabled */
		noscript {
			position: absolute;
			z-index: 5;
			width: 100%;
			height: 100vh;
			top: 0;
			left: 0;
			background-color: rgba( 0, 0, 0, 0.75);
			display: flex;
			justify-content: center;
			align-items: center;
			flex-flow: column;
		}

		noscript p {
			margin-bottom: 15px;
			font-size: 32px;
			text-align: center;
			line-height: 1.5;
		}

		@media (max-width: 660px) {
			noscript p {
				margin-bottom: 8px;
				font-size: 18px;
			}
		}
	</style>
	<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js"></script>
</head>

<body>
	<main>
		<noscript>
			<p>Oh noes, its seems your browser's JavaScript is disabled.</p>
			<p>Enable JavaScript to use the app! :D </p>
		</noscript>

    <div id="phpHash" class="modal">
      <div class="modal-container">
        <div class="modal-heading-container">
          <p>PHP Hash it</p>
        </div>
      </div>
      <div class="modal-content">
        <div class="modal-text">
					<p>Insert you unhash input:</p>
					<p class="small">Leaving the input empty auto-generate random string of 10 characters</p>
				</div>
        <div class="input-container">
          <div class="input-wrapper">
            <input type="text" id="unhashed" value="" class="input">
          </div>
          <button type="button" id="hash_button" class="button">
            <svg id="icon-lock" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g transform="translate(-1443 -1456)"><rect width="40" height="40" rx="10" transform="translate(1443 1456)" fill="none"/><g transform="translate(1456 1467)"><path class="icon-lock-body" d="M619.921,386h0a14.55,14.55,0,0,1-10.929,0h0A1.992,1.992,0,0,0,607,387.992v7.734a1.992,1.992,0,0,0,1.992,1.992h10.929a1.992,1.992,0,0,0,1.992-1.992v-7.734A1.991,1.991,0,0,0,619.921,386Zm-4.324,8.445s-.127.38-1.141.38-1.141-.38-1.141-.38l.378-1.983a1.37,1.37,0,1,1,1.527,0Z" transform="translate(-607 -378.848)" fill="#fff"/><path class="icon-lock-shackle" d="M622.783,345.347a19.6,19.6,0,0,0,2.1.6v-2.082a2.9,2.9,0,0,1,5.782,0v2.082a19.592,19.592,0,0,0,2.1-.6l.034-.012v-1.466a5.024,5.024,0,0,0-10.043,0v1.466Z" transform="translate(-620.353 -339)" fill="#fff"/></g></g></svg>
						<svg id="icon-reload" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g transform="translate(-1494 -1456)"><rect width="40" height="40" rx="10" transform="translate(1494 1456)" fill="none"/><g class="icon-reload-body" transform="translate(603.79 1101)"><path d="M-1095.742,206.578a11.334,11.334,0,0,0-8.474.138l-.316-2.257-3.656,6.424,7.108-2.026-1.922-.766a9.608,9.608,0,0,1,6.642.091,9.614,9.614,0,0,1,6.092,9.863l1.711.166A11.339,11.339,0,0,0-1095.742,206.578Z" transform="translate(1948.693 -48.399) rotate(-11)" fill="#fff"/><path d="M-1115.856,302.177a9.61,9.61,0,0,1-6.642-.091,9.614,9.614,0,0,1-6.092-9.863l-1.711-.166a11.339,11.339,0,0,0,7.184,11.632,11.292,11.292,0,0,0,4.064.755,11.333,11.333,0,0,0,4.41-.892l.317,2.256,3.656-6.424-7.108,2.026Z" transform="translate(1953.069 -126.686) rotate(-11)" fill="#fff"/></g></g></svg>
          </button>
        </div>
				<div id="hashed-container">
	        <p class="modal-text">Hashed!</p>
	        <div class="input-container">
	          <div class="input-wrapper">
	            <input id="hashed" class="input">
	          </div>
	          <button type="button" id="copy_button" class="button">
	            <svg id="icon-copy" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g transform="translate(-1545 -1456)"><rect width="40" height="40" rx="10" transform="translate(1545 1456)" fill="none"/><g transform="translate(2656.074 963.673)"><g id="icon-copy-front" transform="translate(-1100 505.957)"><path d="M-1091.176,556.23V551h-6.056a2.768,2.768,0,0,0-2.768,2.768v12.311a2.768,2.768,0,0,0,2.768,2.768h9.039a2.768,2.768,0,0,0,2.768-2.768V556.23Z" transform="translate(1100 -551)" fill="#fff"/><path d="M-1003,551v4.437h4.958Z" transform="translate(1012.618 -551)" fill="#fff"/></g><g id="icon-copy-back" transform="translate(-1096.133 501)"><path d="M-964,501v4.437h4.957Z" transform="translate(973.617 -501)" fill="#fff"/><path d="M-1052.176,506.23V501h-6.056a2.768,2.768,0,0,0-2.768,2.768v1.4h5.8a.793.793,0,0,1,.529.2l4.957,4.437a.793.793,0,0,1,.264.591v8.452h.256a2.768,2.768,0,0,0,2.768-2.768V506.23Z" transform="translate(1061 -501)" fill="#fff"/></g></g></g></svg>
	          </button>
	        </div>
				</div>
      </div>
    </div>

	</main>

	<footer>
		<div class="footer-container">
			<?php
			if ( date( 'Y' ) > 2018 ) {
				$year = '2018 - ' . date( 'Y' );
			} else {
				$year = '2018';
			}
			?>
			<p>BCrypt Hashing  v<?php echo $version; ?> &copy; Ian Yong,	<?php echo $year; ?>.</p>
		</div>
	</footer>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script>

		function random_str(length, keyspace, randomise) {
		  keyspace == undefined ? keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' : null;
		  randomise == undefined ? randomise = false : null;
		  if ( randomise == true )
		    keyspace = keyspace.split('').sort(function(){return 0.5 - Math.random()}).join('');
		  var output = "";
		  for (var i = 0; i < length; i++)
		    output += keyspace.charAt(Math.floor(Math.random() * keyspace.length));
		  return output;
		}

		function hashFunction() {
			var unhashed = $("#unhashed").val();
			var data = {"unhashed": unhashed};
			$.post(location.href, data, function(result){
				$("#hashed").val(result);
				hashOpen("#hashed-container");
				$("#phpHash").addClass("hashed");
				$("#copy_button").click(function(){
					coptyToClipboard();
				});
			})
		}

		function hashOpen(container) {
			var open = TweenMax.to(container, 1.5, {maxHeight: 200, ease: Power3.easeOut});
		}

		function coptyToClipboard() {
		  var copyText = document.getElementById("hashed");
			console.log(copyText);
		  copyText.select();
		  document.execCommand("copy");
		}

		let isRandom = false;

		$("#hash_button").click(function(){
			var unhashed = $("#unhashed").val();
			if (unhashed == "")
				isRandom = true;
			if ( isRandom )
				$("#unhashed").val(random_str(10));
			hashFunction();
		});

		$("#unhashed").change(function() {
			if ( isRandom )
				isRandom = false;
			if ( $(this).val() == "" )
				isRandom = true;
		});

		let lockShackleTween = new TimelineMax();
		let lockBodyTween = new TimelineMax();
		let lockTweenDuration = 0.75;
		let lockShackleY = -339;
		let lockBodyY = -378.848;
		lockShackleTween.pause();
		lockBodyTween.pause();
		lockShackleTween
			.to(".icon-lock-shackle", lockTweenDuration * 0.5 , { y: lockShackleY - 5, ease: Power2.easeInOut })
			.to(".icon-lock-shackle", lockTweenDuration * 0.5, { y: lockShackleY, ease: Power2.easeInOut });
		lockBodyTween
			.to(".icon-lock-body", lockTweenDuration * 0.35, { y: lockBodyY - 3, ease: Power2.easeInOut })
			.to(".icon-lock-body", lockTweenDuration * 0.35, { y: lockBodyY, ease: Power2.easeInOut });

		$("#hash_button").mouseenter(function(){
			lockShackleTween.play();
			lockBodyTween.play();
			lockShackleTween.progress(0);
			lockBodyTween.progress(0);
		});

		let reloadTweenDuration = 0.5;

		$("#hash_button").mouseenter(function(){
			let reloadTween = TweenMax.to(".icon-reload-body", reloadTweenDuration, {rotation: "-=180", transformOrigin: "center", ease: Power4.easeOut });
		});

		let copyTweenDuration = 0.35;
		let copyTweenOffset = 1;
		let copyFrontX = -1100;
		let copyFrontY = 505.957;
		let copyFrontTween = TweenMax.to("#icon-copy-front", copyTweenDuration, {x: copyFrontX - copyTweenOffset, y: copyFrontY + copyTweenOffset, ease: Power3.easeOut});
		copyFrontTween.pause();

		let copyBackX = -1096.133;
		let copyBackY = 501;
		let copyBackTween = TweenMax.to("#icon-copy-back", copyTweenDuration, {x: copyBackX + copyTweenOffset, y: copyBackY - copyTweenOffset, ease: Power3.easeOut});
		copyBackTween.pause();

		$("#copy_button").mouseenter(function(){
			copyFrontTween.play();
			copyBackTween.play();
		}).mouseleave(function(){
			copyFrontTween.reverse();
			copyBackTween.reverse();
		});


	</script>
</body>
</html>
<?php } ?>
