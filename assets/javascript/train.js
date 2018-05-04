$(".btn-wrapper-day-night").on("click", function() {
  $(".layer").toggleClass("toggle-layer", 1000);
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
$("#add-train-btn").on("click", function(event) {
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

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  // Prettify the employee start
  //   var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  //   // Calculate the months worked using hardcore math
  //   // To calculate the months worked
  //   var empMonths = moment().diff(moment(empStart, "X"), "months");
  //   console.log(empMonths);

  //   // Calculate the total billed rate
  //   var empBilled = empMonths * empRate;
  //   console.log(empBilled);

  // Add each train's data into the table
  $(".train-table > tbody").append(
    "<tr><td>" +
      trainName +
      "</td><td>" +
      destination +
      "</td><td>" +
      frequency +
      "</td><td>" +
      "Works!" +
      "</td><td>" +
      "Woop!" +
      "</td></tr>"
  );
});
