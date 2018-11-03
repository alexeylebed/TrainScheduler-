var config = {
    apiKey: "AIzaSyAjnI4gbldyru4ZWdhtEiFhH5Rt4mHqchE",
    authDomain: "laberkeleybootcamp.firebaseapp.com",
    databaseURL: "https://laberkeleybootcamp.firebaseio.com",
    projectId: "laberkeleybootcamp",
    storageBucket: "laberkeleybootcamp.appspot.com",
    messagingSenderId: "658460268013"
  };

firebase.initializeApp(config);

var database = firebase.database();
var trains = [
  {
    trainName: 'LA Star',
    destination: 'Los Angeles',
    firstTrainTime: '10:00',
    frequency: '30'
  }
];

var trainName ='';
var destination ='';
var firstTrainTime ='';
var frequency ='';

var nextArrival;
var minutesAway;

var warnings = {
  createWrongFrequency: function(){
    var wrongFreq = document.createElement('div');
    var parentforwrongFreq = document.getElementById('frequencyParent');
    wrongFreq.innerHTML = 'Frequency must be specified and must be lower 1400 min bro!';
    wrongFreq.id = 'wrongFreq';
    wrongFreq.style.display = 'none';
    wrongFreq.style.color = 'red';
    parentforwrongFreq.append(wrongFreq);
    return wrongFreq;
  },
  createWrongTrainName: function(){
    var wrongTrainName = document.createElement('div');
    var parentforWrongTrainName = document.getElementById('trainNameParent');
    wrongTrainName.innerHTML = 'Train Name is required field';
    wrongTrainName.style.display = 'none';
    wrongTrainName.style.color = 'red';
    wrongTrainName.id = 'wrongTrainName';
    parentforWrongTrainName.append(wrongTrainName);
    return wrongTrainName;
  },
  createWrongDestination: function(){
    var wrongDestination = document.createElement('div');
    var parentforWrongDestination = document.getElementById('destinationParent');
    wrongDestination.innerHTML = 'Destination is required field';
    wrongDestination.style.display = 'none';
    wrongDestination.style.color = 'red';
    wrongDestination.id = 'wrongDestination';
    parentforWrongDestination.append(wrongDestination);
    return wrongDestination;
  },
  createWrongTrainTime: function(){
    var wrongTrainTime = document.createElement('div');
    var parentforWrongTrainTime = document.getElementById('firstTrainTimeParent');
    wrongTrainTime.innerHTML = 'First Train Time is required field';
    wrongTrainTime.style.display = 'none';
    wrongTrainTime.style.color = 'red';
    wrongTrainTime.id = 'wrongTrainTime';
    parentforWrongTrainTime.append(wrongTrainTime);
    return wrongTrainTime;
  },
  checkfrequency: function(){
    console.log(frequency)
    if(document.getElementById('wrongFreq') != null){
      document.getElementById('wrongFreq').remove();
    }
    if(frequency  == ''){
      this.createWrongFrequency().style.display = 'block';
      return false;
    }
    if(frequency  > 24*60){
      console.log('Too much');
      this.createWrongFrequency().style.display = 'block';
      return false;
    } else {
      this.createWrongFrequency().style.display = 'none';
      return true;
    }
  },
  checkTrainName: function(){
    if(document.getElementById('wrongTrainName') != null){
      document.getElementById('wrongTrainName').remove();
    }
    if(trainName  == ''){
      this.createWrongTrainName().style.display = 'block';
      return false;
    } else {
      this.createWrongTrainName().style.display = 'none';
      return true;
    }
  },
  checkDestination: function(){
    if(document.getElementById('wrongDestination') != null){
      document.getElementById('wrongDestination').remove();
    }
    if(destination  == ''){
      this.createWrongDestination().style.display = 'block';
      return false;
    } else {
      this.createWrongDestination().style.display = 'none';
      return true;
    }
  },
  checkTrainTime: function(){
    if(document.getElementById('wrongTrainTime') != null){
      document.getElementById('wrongTrainTime').remove();
    }
    if(firstTrainTime  == ''){
      this.createWrongTrainTime().style.display = 'block';
      return false;
    } else {
      this.createWrongTrainTime().style.display = 'none';
      return true;
    }
  },
  run: function(){
    var check1 = this.checkfrequency();
    var check2 = this.checkTrainName();
    var check3 = this.checkDestination();
    var check4 = this.checkTrainTime();
    if(check1 && check2 && check3 && check4){
      return true;
    } else{
      return false;
    }
  }
}


function render(){
  //console.log(trains)
  for(i = 0; i <  trains.length; i++){
    let id = "tr" + i;
    if(document.getElementById(id) != null){
        document.getElementById(id).remove();
    }
    var newtr = $('<tr>');
    newtr.attr('id', id);
    trainName = $('<th>').text(trains[i].trainName);
    destination = $('<td>').text(trains[i].destination);
    frequency = $('<td>').text(trains[i].frequency);
    nextArrival = $('<td>').text(trains[i].nextArrival);
    minutesAway  = $('<td>').text(trains[i].minutesAway);
    newtr.append(trainName);
    newtr.append(destination);
    newtr.append(frequency);
    newtr.append(nextArrival);
    newtr.append(minutesAway);
    $('#parentfornewemployee').append(newtr);
  };
  return true;
};

function getfrominputs(){
  trainName = $("#trainName").val();
  destination = $("#destination").val();
  firstTrainTime = $("#firstTrainTime").val();
  frequency = $("#frequency").val();
  nextArrival = getNextArrival(firstTrainTime);
};

function clearinputs(){
  $("#trainName").val('');
  $("#destination").val('');
  $("#firstTrainTime").val('');
  $("#frequency").val('');
};



function getNextArrival(){
  
  for(j = 0; j < trains.length; j++){
    //First Train time in minutes(MMMM)
    let firstTrain = trains[j].firstTrainTime.split(':');
  
    for(i =0; i < firstTrain.length; i++){
      firstTrain[i] = parseInt(firstTrain[i]);
    };
    firstTrain = firstTrain[0]*60 +  firstTrain[1];
    //Train  arrival times in minutes(MMMM)
    let time = firstTrain;
    let arrivals = [firstTrain];
    let counter = 0;
    while(time < 24*60){
      arrivals.push(arrivals[counter] + parseInt(trains[j].frequency)) ;
      counter ++;
      time +=  parseInt(trains[j] .frequency);
    }

    //Get NOW moment in minutes(MMMM)
    var now = new Date();
    now = now.getHours()*60  + now.getMinutes();

    //Get next arrival in minutes(MMMM)
    for(i = 0; i < arrivals.length; i++){
      if(now < arrivals[i]){
        nextArrival = arrivals[i];
        i = arrivals.length;
      }
    }
    
    //Get minutes away
    minutesAway = nextArrival - now;
  
    //Get next arrival in hours and minutes(HH:MM)
    var hours = Math.trunc(nextArrival/60);
    var minutes = nextArrival - hours*60;
    if(hours > 24){
      hours =  hours - 24;
    }
    if(minutes < 10){
      minutes = '0' + minutes;
    }
    trains[j].nextArrival = hours + ':' + minutes; 
    trains[j].minutesAway  = minutesAway;
  };
};

function push(){
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
  });
};

function gettrains(snapshot){
  trains.push({
  trainName: snapshot.val().trainName,
  destination: snapshot.val().destination,
  firstTrainTime: snapshot.val().firstTrainTime,
  frequency: snapshot.val().frequency
  
  });
}


$("#submit").on("click", function(event) {
    event.preventDefault();
    getfrominputs();
    console.log(frequency);
    if(warnings.run()){
      push();
      clearinputs();
    };
});

database.ref().on("child_added", function(snapshot) {
    gettrains(snapshot);
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


  getNextArrival();
  render();
setInterval(function(){
  getNextArrival();
  render();
}, 1000);






