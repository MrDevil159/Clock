(function() {
    var hours = Number('00');
    var minutes = Number('00');
    var seconds = Number('00');
    var tens = Number('00');
    var aHours = document.getElementById("hours");
    var aMinutes = document.getElementById("minutes");
    var aSeconds = document.getElementById("seconds");
    var aTens = document.getElementById("tens");
    var Start = document.getElementById("start");
    var Stop = document.getElementById("stop");
    var reset = document.getElementById("reset");
    var clear = document.getElementById("clear");
    var content = document.getElementById("content");
    var Interval;
    var totalTaps = document.getElementById('totalTaps');
    var Lap = document.getElementById("lap");
    var Laps = document.getElementById("laps");
    var lapCount = 1;
    var lapsContent = document.getElementById("laps").innerHTML;
    var lastLap = { hours: 0, minutes: 0, tens: 0, seconds: 0 };
    var boolReset = boolStop = boolStart = false;
    var items = false;
  
    function leftPad(value) {
      return value < 10 ? "0" + value : value;
    }
  
    Start.onclick = function() {
      boolStart = true;
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
      
      Stop.style.display = "block";
      Start.style.display = "none";
      reset.style.display = "none";
      Lap.style.display = "block";
    };
  
    Stop.onclick = function() {
      boolStop = true;
      clearInterval(Interval);
      // curse();
      var value = {'hours':hours, 'minutes':minutes, 'seconds':seconds, 'tens':tens};
      console.log(value)
      localStorage.setItem('mainTimer', JSON.stringify(value))
      Start.style.display = "block";
      Stop.style.display = "none";
      Lap.style.display = "none";
      reset.style.display = "block";
    };
  
    reset.onclick = function() {
      boolReset = true;
      clearInterval(Interval);
      localStorage.clear('mainTimer')
      hours = "00";
      minutes = "00";
      seconds = "00";
      tens = "00";
      aHours.innerHTML = hours;
      aMinutes.innerHTML = minutes;
      aSeconds.innerHTML = seconds;
      aTens.innerHTML = tens;
    };
  
    function startTimer() {
      tens++;
  
      if (tens < 9) {
        aTens.innerHTML = "0" + tens;
      }
  
      if (tens > 9) {
        aTens.innerHTML = tens;
      }
  
      if (tens > 99) {
        seconds++;
        aSeconds.innerHTML = "0" + seconds;
        tens = 0;
        aTens.innerHTML = "0" + 0;
      }
  
      if (seconds > 9) {
        aSeconds.innerHTML = seconds;
      }
  
      if (seconds > 59) {
        minutes++;
        aMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        aSeconds.innerHTML = "0" + 0;
        tens = 0;
        aTens.innerHTML = "0" + 0;
      }
  
      if (minutes > 9) {
        aMinutes.innerHTML = minutes;
      }
  
      if (minutes > 59) {
        hours++;
        aHours.innerHTML = "0" + hours;
        minutes = 0;
        aMinutes.innerHTML = "0" + 0;
        seconds = 0;
        aSeconds.innerHTML = "0" + 0;
        tens = 0;
        aTens.innerHTML = "0" + 0;
      }
  
      if (hours > 9) {
        aHours.innerHTML = hours;
      }
      var value = {'hours':hours, 'minutes':minutes, 'seconds':seconds, 'tens':tens};
      console.log('seting',value)
      localStorage.setItem('mainTimer', JSON.stringify(value))
      
      // localStorage.removeItem('mainTimer')
    }
    
    // let lapArray = [];
    var totalHours = 0;
    var totalMinutes = 0;
    var totalSeconds = 0;
    var totalTens = 0;
    var lapHours = 0;
    var lapMinutes = 0;
    var lapSeconds = 0;
    var lapTens = 0;
    Lap.onclick = function() {
      content.classList.remove("d-none");
       totalHours = hours;
       totalMinutes = minutes;
       totalSeconds = seconds;
       totalTens = tens;
       console.log('total', totalHours, totalMinutes, totalSeconds)
      console.log(lapHours, lapMinutes, lapSeconds, lapTens)
       lapHours = hours - lastLap.hours;
       lapMinutes = minutes - lastLap.minutes;
      if (lapMinutes < 0) {
        lapMinutes = minutes - lastLap.minutes + 60;
      }
       lapSeconds = seconds - lastLap.seconds;
      if (lapSeconds < 0) {
        lapSeconds = seconds - lastLap.seconds + 60;
      }
       lapTens = tens - lastLap.tens;
      if (lapTens < 0) {
        lapTens = tens - lastLap.tens + 100;
      }
      lastLap = {
        tens: tens,
        seconds: seconds,
        minutes: minutes,
        hours: hours
      };
      if(items) {
        console.log('hi', lapHours,lapMinutes, lapSeconds, lapTens)
        lapHours = 0;
        lapMinutes = 0;
        lapSeconds = 0;
        lapTens = 0;
        items = false;
      }
      
      
      
      if (localStorage.getItem("lapsLength") !== null) {
        lapCount = localStorage.getItem("lapsLength");
        console.log(lapCount)
      }
      
      creatingLis();
        
        // lapArray.push({'hours':leftPad(lapHours), 'minutes':leftPad(lapMinutes), 'seconds':leftPad(lapSeconds), 'tens':leftPad(lapTens)})
        // localStorage.setItem('lapTime', JSON.stringify(lapArray))
        // localStorage.clear();
        var len = Laps.getElementsByTagName('li').length;
        localStorage.setItem("lapsLength", len + 1);
    };

    function creatingLis() {
      var lapItem = document.createElement("li");
      console.log('lap', lapCount);
      lapItem.innerHTML =
        "Lap " +
        lapCount++ +
        " – " +
        leftPad(lapHours) +
        ":" +
        leftPad(lapMinutes) +
        ":" +
        leftPad(lapSeconds) +
        "." +
        leftPad(lapTens);
        
      console.log(totalHours, totalMinutes, totalSeconds)
        var totalTimes = document.createElement('li');
        totalTimes.innerHTML = leftDads(totalHours) + ":" + leftDads(totalMinutes) + ":" + leftDads(totalSeconds) + ":" + leftDads(totalTens)
        Laps.insertBefore(lapItem, Laps.firstChild);
        totalTaps.insertBefore(totalTimes, totalTaps.firstChild);
        localStorage.setItem("laps", Laps.innerHTML);
        localStorage.setItem("totalLaps", totalTaps.innerHTML);
    }


    function leftPads(value) {
      return value < 10 ? "0" + value : value;
    }
    function leftDads(value) {
      console.log('th', value);
      if (value == 0 && value.length >= 1) {
        return "00";
      }
      return value < 10  ? "0" + value : value;
    }
   
    clear.onclick = function() {
      Laps.innerHTML = "";
      totalTaps.innerHTML = "";
      localStorage.removeItem("laps");
      localStorage.removeItem("totalLaps");
      localStorage.setItem("lapsLength", 1);
      content.classList.add("d-none");
      lapCount = 1;
    };
    
    window.addEventListener("DOMContentLoaded", function() {
        if (localStorage.getItem("laps")) {
          Laps.innerHTML = localStorage.getItem("laps");
          console.log('len', localStorage.getItem("laps").length)
          totalTaps.innerHTML = localStorage.getItem("totalLaps");
          
          if (localStorage.getItem("lapsLength").length == 0) {
              console.log('li','0')
          }
          items = true;
        } 
        if(localStorage.getItem('mainTimer') === null) {

        
        var value = {'hours':hours, 'minutes':minutes, 'seconds':seconds, 'tens':tens};
        console.log(value)
        localStorage.setItem('mainTimer', JSON.stringify(value))
        }
        

        if (localStorage.getItem('mainTimer') !== null) {
          var s = localStorage.getItem('mainTimer');
          var t = JSON.parse(s);
          console.log('ts',typeof t.hours)
          console.log('k',(t.hours.toString()).length);
          if ((t.hours.toString()).length == 1 && t.hours.toString() == "0") {
            t.hours = "00";
          }
          if ((t.minutes.toString()).length == 1 && t.minutes.toString() == "0") {
            t.minutes = "00";
          }
          hours = t.hours
          minutes = (t.minutes);
          seconds = leftPad(t.seconds);
          tens = (t.tens);
          aHours.innerHTML = hours;
          aMinutes.innerHTML = minutes;
          aSeconds.innerHTML = seconds;
          aTens.innerHTML = tens;
        }

        if (localStorage.getItem("laps") !== null && localStorage.getItem("laps").length > 0) {
          content.classList.remove("d-none");
        } else {
          content.classList.add("d-none");
        }
    });
})();
  