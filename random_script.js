window.onload = function() {
  /* Converts randomly generated HSV values into RGB */

  function HSVtoRGB() {
  		if (finalFilters.includes("entireFamily") || finalFilters.length === 0 ) {
      	var h = Math.random() * (1 - 0) + 0;
  			var s = Math.random() * (1 - 0) + 0;
  			var v = Math.random() * (1 - 0) + 0;
      } else if (finalFilters.includes("redFamily")){
      	h = Math.random() * (1 - 0) + 0;
  			s = Math.random() * (1 - 0) + 0;
  			v = Math.random() * (1 - 0) + 0;
      } else {
      	h = Math.random() * (1 - 0) + 0;
  			s = Math.random() * (1 - 0) + 0;
  			v = Math.random() * (1 - 0) + 0;
      }

      var r, g, b, i, f, p, q, t;
      if (arguments.length === 1) {
          s = h.s, v = h.v, h = h.h;
      }
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
          case 0: r = v, g = t, b = p; break;
          case 1: r = q, g = v, b = p; break;
          case 2: r = p, g = v, b = t; break;
          case 3: r = p, g = q, b = v; break;
          case 4: r = t, g = p, b = v; break;
          case 5: r = v, g = p, b = q; break;
      }
      return {
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255)
      };
  }

  /* Convert RGB to Hex */

  function rgbToHex(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };

  function fullColorHex(r, g, b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red + green + blue;
  };

  /* Passes Color and Creates DIV */

  function drawCircle(idValue, color) {
    var circle = document.createElement('div');
    circle.className = 'circle';
    circle.id = 'circle_' + idValue
    circle.style.background = color;
    document.body.appendChild(circle);
  }

  /* RETIRED CODE */

  /* Generates Random Whole Number Between 0 and 255 */

  /* function randomColorNumber() {
    return Math.floor(Math.random() * 256)
    return Math.random() * (255 - 0) + 0;
  } */

  /* Erases Squares */

  function eraseSquares() {
    var squares = document.getElementsByTagName('canvas');
    while (squares.length > 0) {
      squares[0].parentNode.removeChild(squares[0]);
    }
  }

  /* Erases Circles */

  function eraseCircles() {
    var circles = document.getElementsByClassName('circle');
    while (circles.length > 0) {
      circles[0].parentNode.removeChild(circles[0]);
    }
    eraseSquares();
  }

  /* Generates Hexes and Pushes Into Hex Queue */

  function generateHexes(amount) {
    for (var i = 0; i < amount; i = i + 1) {
      var r = HSVtoRGB().r
      var g = HSVtoRGB().g
      var b = HSVtoRGB().b
      var hex = fullColorHex(r, g, b)
      queuedHexes.push(hex)
    }
  }

  /* Takes Queued Hexes, Checks Against Used Hexes, and Generates Unique Circles with drawCircle Function */

  function makeCircles() {
    for (i = 0; i < queuedHexes.length; i++) {
      var hexTested = queuedHexes[i]
      while (usedHexes.includes(hexTested)) {
        alert("found a duplicate")
        let r = HSVtoRGB().r
        let g = HSVtoRGB().g
        let b = HSVtoRGB().b
        let hex = fullColorHex(r, g, b)
        alert(hexTested)
        alert(hex)
        hexTested = hex
        alert(hexTested)
      }
      idNumber++
      drawCircle(idNumber, `#${hexTested}`)
      usedHexes.push(hexTested)
    }
    eraseSquares();
  }

  /* Generates Savable Squares */

  function createSavable() {
    var squares = document.getElementsByTagName('canvas')
    if (idNumber != squares.length) {
      for (i = 1; i < idNumber + 1; i++) {
        html2canvas(document.getElementById('circle_' + i), {
          onrendered: function(canvas) {
            document.body.appendChild(canvas);
          }
        });
      }
    } else {
      alert("Please create more circles!")
    }
  }

  function filterCheck(filters) {
  	for (i = 0; i < filters.length; i++) {
    	if (filters[i].checked === true) {
      	finalFilters.push(filters[i].value)
      }
    }
  }

  /* Variables */

  var usedHexes = []
  var queuedHexes = []
  var clicks = 0
  var amount = 0
  var totalCircles = 0
  var idNumber = 0
  var finalFilters = []

  /* On Click Functions*/

  document.getElementById('a').onclick = function() {
  	var filters = document.getElementsByClassName('filter');
    filterCheck(filters)
    amount = document.getElementById('amount').value
    totalCircles = totalCircles + parseInt(amount)
    clicks++
    generateHexes(amount)
    makeCircles()
    queuedHexes.length = 0
    finalFilters = []
  }

  document.getElementById('b').onclick = function() {
    eraseCircles()
    idNumber = 0
    usedHexes.length = 0
    queuedHexes.length = 0
    clicks = 0
    totalCircles = 0
  }

  document.getElementById('c').onclick = function() {
    alert(`Clicked create ${clicks} times for a total of ${totalCircles} circles with final ID being ${idNumber}. Total hexes used: ${usedHexes.length}.`)
  }

  document.getElementById('d').onclick = function() {
    createSavable()
  }

}
