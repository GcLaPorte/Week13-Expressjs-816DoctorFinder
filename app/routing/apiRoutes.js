
var doctors = require("../data/doctors");


module.exports = function(app) {


  app.get("/api/doctors", function(req, res) {
    res.json(doctors);
  });



  app.post("/api/doctors", function(req, res) {
   
    var doctorData = {
      name: "",
      photo: "",
      doctorDifference: Infinity
    };

    console.log(req.body.userData)
    var userData = req.body.userData;
    var userScores = userData.scores;

  
    var totalDifference;

    for (var i = 0; i < doctors.length; i++) {
      var yourDoctor = doctors[i];
      totalDifference = 0;

      console.log(doctors.name);

     
      for (var j = 0; j < doctors[i].scores[j]; j++) {
        var doctorResult = yourDoctor.scores[j];
        // var yourDoctorScore = userScores[j];

       
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(doctors[i].scores[j]));
      }

      
      if (totalDifference <= doctorData.doctorDifference) {
        // Reset the bestMatch to be the new friend.
        doctorData.name = doctors[i].name;
        doctorData.photo = doctors[i].photo;
        doctorData.doctorDifference = totalDifference;

        
      }
    }

    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    doctors.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(doctorData);
  });
};
