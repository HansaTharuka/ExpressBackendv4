
//git push heroku master
//heroku open
//https://medium.com/@grantspilsbury/build-and-deploy-a-node-express-server-to-heroku-in-10-steps-70c936ab15dc
var express = require('express');
const functions = require('firebase-functions');
var firebase = require('firebase');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());
var config = {
    apiKey: "AIzaSyBhltZxwtuznsFKMV1ZcyO6-Chx8MQxiB4",
    authDomain: "expressapifirebase.firebaseapp.com",
    databaseURL: "https://expressapifirebase.firebaseio.com",
    projectId: "expressapifirebase",
    storageBucket: "expressapifirebase.appspot.com",
    messagingSenderId: "605847905253",
    appId: "1:605847905253:web:3b1724c19326523b87450c"
};
firebase.initializeApp(config);


app.put('/register_doctor', function (req, res) {

    console.log("HTTP Put Request");

    var doctorId = req.body.doctorId;
    var doctorName = req.body.doctorName;
    var doctorPassword = req.body.doctorPassword;
    var doctorEmail = req.body.doctorEmail;
    var referencePath = '/Users/Doctors/' + doctorId + '/';
    // var referencePath2 = '/ScoreDB/' + deviceId + `${Date.now()}` + '/';

    var userReference = firebase.database().ref(referencePath);
    // var userReference2 = firebase.database().ref(referencePath2);

    userReference.update({"doctorId": doctorId, "doctorName": doctorName, "doctorPassword": doctorPassword, "doctorEmail": doctorEmail, "Role":"doctor"},
        function (error) {
            if (error) {
                res.json("Data could not be saved.");
            }
            else {
                res.json(req.body);
            }
        });
});

app.put('/register_patient', function (req, res) {

    console.log("HTTP Put Request");

    var patientId = req.body.patientId;
    var patientName = req.body.patientName;
    var patientPassword = req.body.patientPassword;
    var patientEmail = req.body.patientEmail;
    var doctorID = req.body.doctorID;
    var referencePath = '/Users/Patients/' + patientId + '/';

    var userReference = firebase.database().ref(referencePath);
    
    userReference.update({"patientId": patientId, "patientName": patientName, "patientPassword": patientPassword, "patientEmail": patientEmail, "doctorID":doctorID,"Role":"patient"},
        function (error) {
            if (error) {
                res.json("Data could not be saved.");
            }
            else {
                res.json(req.body);
            }
        });
});

app.get('/login_doctor/:doctorId/:doctorPassword', function (req, res) {
    var userReference = firebase.database().ref("/Users/Doctors/" + req.params.doctorId);

    //Attach an asynchronous callback to read the data
    userReference.on("value",
        function (snapshot) {
            if (snapshot.val().doctorId == req.params.doctorId && snapshot.val().doctorPassword == req.params.doctorPassword) {
                res.json({"Login":true,"doctorId":snapshot.val().doctorId,"doctorName":snapshot.val().doctorName,"doctorEmail":snapshot.val().doctorEmail,"Role":"doctor"});
            } else {
                res.json({"Login":false,"Role":"doctor"});
            }
            userReference.off("value");
        },
        function (errorObject) {
            res.json({"Login":false,"Role":"doctor"});
        });
});

app.get('/login_patient/:patientId/:patientPassword', function (req, res) {
    if(req.params.patientId != null || req.params.patientId != ""){
        var userReference = firebase.database().ref("/Users/Patients/" + req.params.patientId);
        //Attach an asynchronous callback to read the data
    userReference.on("value",
    function (snapshot) {
        if (snapshot.val().patientId == req.params.patientId && snapshot.val().patientPassword == req.params.patientPassword) {
            res.json({"Login":true,"patientId":snapshot.val().patientId,"patientName":snapshot.val().patientName,"patientEmail":snapshot.val().patientEmail,"Role":"doctor"});
        } else {
            res.json({"Login":false,"Role":"patient"});
        }
        userReference.off("value");
    },
    function (errorObject) {
        res.json({"Login":false,"Role":"patient"});
    });
    }else{
        res.json({"Login":false,"Role":"patient"});
    }
    

    
});

app.get('/init_game_all/:patientId', function (req, res) {

    console.log("HTTP Put Request");

    var patientId = req.params.patientId;
    var referencePath = '/Users/Patients/' + patientId + '/';

    var userReference = firebase.database().ref(referencePath);

    userReference.update({
        "Q02": { "QuestionCatogary": 'Fundamental', "Correctness": false, "Timetaken": 0 },
        "Q01": { "QuestionCatogary": 'Fundamental', "Correctness": false, "Timetaken": 0 },
        "Q03": { "QuestionCatogary": 'Fundamental', "Correctness": false, "Timetaken": 0 },
        "Q04": { "QuestionCatogary": 'Fundamental', "Correctness": false, "Timetaken": 0 },
        "Q05": { "QuestionCatogary": 'Fundamental', "Correctness": false, "Timetaken": 0 },
        "Q06": { "QuestionCatogary": 'Fundamental', "Correctness": false, "Timetaken": 0 },
        "Q07": { "QuestionCatogary": 'Fundamental', "Correctness": false, "Timetaken": 0 },
        "Q08": { "QuestionCatogary": 'Fundamental', "Correctness": false, "Timetaken": 0 },
        "Q09": { "QuestionCatogary": 'Fundamental', "Correctness": false, "Timetaken": 0 }, 
        "Q10": { "QuestionCatogary": 'Fundamental', "Correctness": false, "Timetaken": 0 },

        "Q11": { "QuestionCatogary": 'Intermidiate', "Correctness": false, "Timetaken": 0 },
        "Q12": { "QuestionCatogary": 'Intermidiate', "Correctness": false, "Timetaken": 0 },
        "Q13": { "QuestionCatogary": 'Intermidiate', "Correctness": false, "Timetaken": 0 },
        "Q14": { "QuestionCatogary": 'Intermidiate', "Correctness": false, "Timetaken": 0 },
        "Q15": { "QuestionCatogary": 'Intermidiate', "Correctness": false, "Timetaken": 0 },
        "Q16": { "QuestionCatogary": 'Intermidiate', "Correctness": false, "Timetaken": 0 },
        "Q17": { "QuestionCatogary": 'Intermidiate', "Correctness": false, "Timetaken": 0 },
        "Q18": { "QuestionCatogary": 'Intermidiate', "Correctness": false, "Timetaken": 0 },
        "Q19": { "QuestionCatogary": 'Intermidiate', "Correctness": false, "Timetaken": 0 },
        "Q20": { "QuestionCatogary": 'Intermidiate', "Correctness": false, "Timetaken": 0 },

        "Q21": { "QuestionCatogary": 'Advanced', "Correctness": false, "Timetaken": 0 },
        "Q22": { "QuestionCatogary": 'Advanced', "Correctness": false, "Timetaken": 0 },
        "Q23": { "QuestionCatogary": 'Advanced', "Correctness": false, "Timetaken": 0 },
        "Q24": { "QuestionCatogary": 'Advanced', "Correctness": false, "Timetaken": 0 },
        "Q25": { "QuestionCatogary": 'Advanced', "Correctness": false, "Timetaken": 0 },
        "Q26": { "QuestionCatogary": 'Advanced', "Correctness": false, "Timetaken": 0 },
        "Q27": { "QuestionCatogary": 'Advanced', "Correctness": false, "Timetaken": 0 },
        "Q28": { "QuestionCatogary": 'Advanced', "Correctness": false, "Timetaken": 0 },
        "Q29": { "QuestionCatogary": 'Advanced', "Correctness": false, "Timetaken": 0 },
        "Q30": { "QuestionCatogary": 'Advanced', "Correctness": false, "Timetaken": 0 }
    },
        function (error) {
            if (error) {
                res.json("Data could not be saved.");
            }
            else {
                res.json(200);
            }
        });
});

app.put('/update_question_data', function (req, res) {

    var patientId = req.body.patientId;
    var questionID = req.body.questionID;
    var correctness = req.body.correctness;
    var timetaken = req.body.timetaken;
    var newtimetaken;
    if(correctness == false){
        newtimetaken= 20;
    }else{
        newtimetaken = req.body.timetaken;
    }

    var referencePath = '/Users/Patients/' + patientId + '/' + questionID +'/';

    var userReference = firebase.database().ref(referencePath);

    userReference.update({"Correctness": correctness, "Timetaken": newtimetaken},
        function (error) {
            if (error) {
                res.json("Data could not be saved.");
            }
            else {
                res.json(200);
            }
        });
    
});

app.get('/get_results/:patientId', function (req, res) {
    var userReference = firebase.database().ref("/Users/Patients/" + req.params.patientId);

    //Attach an asynchronous callback to read the data
    userReference.on("value",
        function (snapshot) {
            console.log();
            var result_fumdamental = snapshot.val().Q01.Timetaken+snapshot.val().Q02.Timetaken+snapshot.val().Q03.Timetaken+snapshot.val().Q04.Timetaken+snapshot.val().Q05.Timetaken+
            snapshot.val().Q06.Timetaken+snapshot.val().Q07.Timetaken+snapshot.val().Q08.Timetaken+snapshot.val().Q09.Timetaken+snapshot.val().Q10.Timetaken;

            var result_intermidiate = snapshot.val().Q11.Timetaken+snapshot.val().Q12.Timetaken+snapshot.val().Q13.Timetaken+snapshot.val().Q14.Timetaken+snapshot.val().Q15.Timetaken+
            snapshot.val().Q16.Timetaken+snapshot.val().Q17.Timetaken+snapshot.val().Q18.Timetaken+snapshot.val().Q19.Timetaken+snapshot.val().Q20.Timetaken;

            var result_advanced = snapshot.val().Q21.Timetaken+snapshot.val().Q22.Timetaken+snapshot.val().Q23.Timetaken+snapshot.val().Q24.Timetaken+snapshot.val().Q25.Timetaken+
            snapshot.val().Q26.Timetaken+snapshot.val().Q27.Timetaken+snapshot.val().Q28.Timetaken+snapshot.val().Q29.Timetaken+snapshot.val().Q30.Timetaken;

            res.json({result_fumdamental:result_fumdamental,result_intermidiate:result_intermidiate,result_advanced:result_advanced});
            userReference.off("value");
        },
        function (errorObject) {
            res.send(false);
        });
});

app.get('/get_patients_list/:doctorId', function (req, res) {
    var userReference = firebase.database().ref("/Users/Patients/");
    var myarrayfinal = [];
    userReference.on("value",
        function (snapshot) {
            var values = Object.values(snapshot.val());
            var keys = Object.keys(snapshot.val());
            let arrayLength = values.length;
            for(let i = 0 ; i < arrayLength; i++) {
                if(req.params.doctorId ==values[i].doctorID){
                    myarrayfinal.push(keys[i]);
                }
             }
             
            res.send(myarrayfinal);
            userReference.off("value");
        },
        function (errorObject) {
            res.send(false);
        });
});

app.get('/hello', function (req, res) {
    res.send(JSON.stringify({ Hello: 'hansa'}));
   });

app.get('/', function (req, res) {
 res.send(JSON.stringify({ Hello: 'World'}));
});

app.listen(port, function () {
 console.log('Example app listening on port !');
});