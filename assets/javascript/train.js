$(".btn-wrapper-day-night").on("click", function() {
  $(".layer").toggleClass("toggle-layer", 1000);
  $("table").toggleClass("toggle-table", 1000);
  $("th").toggleClass("toggle-th", 1000);
  $("form").toggleClass("toggle-form", 1000);
  $(".add-train-btn").toggleClass("toggle-add-train-btn", 1000);
  $(".form-input").toggleClass("toggle-form-input", 1000);
  $(".add-train-btn:active").toggleClass("toggle-add-train-btn:active", 1000);
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAeM0cXHNVb4ZP9sPghdGifdJ-2VdskimY",
  authDomain: "flame-bringer.firebaseapp.com",
  databaseURL: "https://flame-bringer.firebaseio.com",
  projectId: "flame-bringer",
  storageBucket: "flame-bringer.appspot.com",
  messagingSenderId: "304671585195"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$(".add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrain = moment(
    $("#first-train-input")
      .val()
      .trim(),
    "HH:mm"
  ).format("X");
  var frequency = $("#frequency-input")
    .val()
    .trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    place: destination,
    first: firstTrain,
    rate: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = moment(childSnapshot.val().first, "X");
  var frequency = childSnapshot.val().rate;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  var nextTrain = firstTrain;
  while (nextTrain < moment()) {
    nextTrain.add(frequency, "m");
  }
  //   var minutesAway = nextTrain.diff(moment(), "m");
  var minutesAway = nextTrain.fromNow();
  //   var hoursAgo = moment().diff(firstTrain, "h");
  console.log(minutesAway);
  //   console.log(hoursAgo);

  //   var nextTrain = moment()
  //     .add(minutesAway, "m")
  //     .format("HH:mm");
  //   console.log(nextTrain);

  // Add each train's data into the table
  $(".train-table > tbody").append(
    "<tr><td>" +
      trainName +
      "</td><td>" +
      destination +
      "</td><td>" +
      frequency +
      "</td><td>" +
      nextTrain.format("HH:mm") +
      "</td><td>" +
      minutesAway +
      "</td></tr>"
  );
});
