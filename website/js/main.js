window.onload = function() {
  $("body").addClass("loaded");
}
$(document).ready(function(){
  var isActive = true;
  //window.addEventListener("focus", function(event) { isActive = true; start() }, false);
  //window.addEventListener("blur", function(event) { isActive = false; }, false);
  var startTime = (new Date()).getTime();
  var velocity = [0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9];
  var sizes = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
  1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2,
  2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3,
  2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2,
  1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1,
  0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2];
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context = canvas.getContext('2d');
  window.addEventListener('resize', resizeCanvas, false);

  let dots = getDots(100);

  resizeCanvas();

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawStuff(context, dots);
  }

  function getDots(n) {
    let array = [];
    for (let i =0; i < n; i++) {
      array.push(getObject());
    }
    return array;
  }
  function drawStuff(context, dots) {
    for (let i =0; i < dots.length; i++) {
      context.beginPath();
      context.arc(dots[i].curX, dots[i].curY, sizes[dots[i].rad]*1.2, 0, 2*Math.PI);
      context.fillStyle = `rgba(0,189,202, ${1 - 0.1/sizes[dots[i].rad]})`;
      context.fill();
    }
  }

  function getObject() {
    var x = Math.round(Math.random() * canvas.width);
    var y = Math.round(Math.random() * canvas.height);
    var dirx = Math.round(Math.random()) ? 1 : -1;
    var diry = Math.round(Math.random()) ? 1 : -1;
    return {
      curX: x,
      curY: y,
      dirX: dirx,
      dirY: diry,
      rad: Math.round(Math.random()*58),
      speedX: Math.round(Math.random()*5)/4,
      speedY: Math.round(Math.random()*5)/4,
      startTime: (new Date()).getTime(),
    };
  }

  function getObjectFromEdge() {
    var randomC = Math.round(Math.random());
    var randomA = Math.round(Math.random());
    var x = randomC ? Math.round(Math.random() * canvas.width) : randomA * canvas.width;
    var y = (1-randomC) ? Math.round(Math.random() * canvas.height) : randomA * canvas.height;
    var dirx = Math.round(Math.random()) ? 1 : -1;
    var diry = Math.round(Math.random()) ? 1 : -1;
    return {
      curX: x,
      curY: y,
      dirX: dirx,
      dirY: diry,
      rad: Math.round(Math.random()*58),
      speedX: velocity[Math.round(Math.random()*4)],
      speedY: velocity[Math.round(Math.random()*4)],
      startTime: (new Date()).getTime(),
    };
  }

  function getUpdatedDot(dot) {
    var timeNow = (new Date()).getTime();
    var timePassed = 2500;
    if (dot.curX > canvas.width + 300 || dot.curX < - 300 || dot.curY > canvas.height + 300  || dot.curY < - 300) {
      return getObject();
    }
    let newCurX = dot.curX + dot.dirX * dot.speedX * timePassed/15000;
    let newCurY = dot.curY + dot.dirY * dot.speedY * timePassed/15000;
    let newRad = dot.rad == sizes.length ? 0 : dot.rad + 1;
    return {
      ...dot,
      rad: newRad,
      curX: newCurX,
      curY: newCurY,
    };
  }

  function redrawFrame(dotsArray) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0; i < dotsArray.length; i++) {
      dotsArray[i] = getUpdatedDot(dotsArray[i]);
    }
    drawStuff(context, dotsArray);
    for (let i=0; i < dotsArray.length; i++) {
      var activeDot = dotsArray[i];
      for (let j=i+1; j < dotsArray.length; j++) {
        if (Math.abs(activeDot.curX - dotsArray[j].curX) < 60 && Math.abs(activeDot.curY - dotsArray[j].curY) < 60) {
          context.moveTo(activeDot.curX,activeDot.curY);
          context.lineTo(dotsArray[j].curX,dotsArray[j].curY);
          context.stroke();
          context.lineWidth = 0.02;
          var d = Math.sqrt(Math.pow(Math.abs(activeDot.curX - dotsArray[j].curX),2)+Math.pow(Math.abs(activeDot.curY - dotsArray[j].curY),2));
          var id = Math.sqrt(Math.pow(60,2)+Math.pow(60,2));
          context.strokeStyle = 'rgba(0,189,202,'+d/id+')';
          if(d/id>1) console.log(d/id);
        }
      }
    }
  }

  function start() {
    redrawFrame(dots)
    if (isActive) setTimeout(start, 25);
  }

  start();

  $.ajax({
    url: "https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-06-01&end=2017-12-15",
    method: "GET",
    dataType: "json",
  }).done(function(data){
    setTimeout(function(){
      var darr = [];
      var lbl = [];
      for (var i=0; i<Object.keys(data.bpi).length; i++) {
        darr.push(Math.round(data.bpi[Object.keys(data.bpi)[i]]));
        lbl.push(Object.keys(data.bpi)[i]);
      }
      var ctx = document.getElementById("myChart").getContext("2d");
	  var gradient = ctx.createLinearGradient(0, 0, 0, 400);
		gradient.addColorStop(0, 'rgba(250,174,50,1)');   
		gradient.addColorStop(1, 'rgba(250,174,50,0)');
	  console.log(darr);
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: lbl,
              datasets: [{
                  label: '$',
                  data: darr,
                  backgroundColor: gradient,
                  borderColor: 'rgba(0,189,202,1)',
                  borderWidth: 1,
              }],
          },
          options: {
              elements: { point: { radius: 0 } },
              legend: {
                display: false
              },
              layout: {
                  padding: {
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0
                  }
              },
              scales: {
                  yAxes: [{
                      gridLines: {
                          display: false,
                          drawBorder: false,
                      },
                      ticks: {
                          display: false
                      }
                  }],
                  xAxes: [{
                      gridLines: {
                          display: false,
                          drawBorder: false,
                      },
                      ticks: {
                          display: false
                      }
                  }]
              }
          },
      });
    }, 200);
  });

  $.ajax({
    url: "https://api.coindesk.com/v1/bpi/currentprice.json",
    method: "GET",
    dataType: "json",
  }).done(function(data){
    $("#btc-price").html("BTC/USD "+Math.round(data.bpi.USD.rate_float));
    $("#btc-price").addClass("vis");
  })
})