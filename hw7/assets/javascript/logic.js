
var config = {
    apiKey: "AIzaSyAtsMpsrt_JK6ye4rwM3acnoXbt3G2gdOs",
        authDomain: "train2-9d708.firebaseapp.com",
        databaseURL: "https://train2-9d708.firebaseio.com",
        projectId: "train2-9d708",
        storageBucket: "",
        messagingSenderId: "204395495514"
};

firebase.initializeApp(config);

var trainData = firebase.database();

$("#addTrainBtn").on("click", function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#desintationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

trainData.ref().push(newTrain);

alert("Train added");

$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#firstTrainInput").val("");
$("#frequencyInput").val("");

return false;
})


trainData.ref().on("child_added", function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;


    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival); 

    $("#trainTable > tBody").append("<tr><td>" +name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

});



    // <!-- The core Firebase JS SDK is always required and must be listed first -->
    // <script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js"></script>
    
    // <!-- TODO: Add SDKs for Firebase products that you want to use
    //      https://firebase.google.com/docs/web/setup#config-web-app -->
    
    // <script>
    //   // Your web app's Firebase configuration
    //   var firebaseConfig = {
    //     apiKey: "AIzaSyAtsMpsrt_JK6ye4rwM3acnoXbt3G2gdOs",
    //     authDomain: "train2-9d708.firebaseapp.com",
    //     databaseURL: "https://train2-9d708.firebaseio.com",
    //     projectId: "train2-9d708",
    //     storageBucket: "",
    //     messagingSenderId: "204395495514",
    //     appId: "1:204395495514:web:5a4c77f4166b3696d35863"
    //   };
    //   // Initialize Firebase
    //   firebase.initializeApp(firebaseConfig);
    // </script>