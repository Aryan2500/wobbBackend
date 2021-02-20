const express = require("express");

const route = express.Router();
const User = require("./db/modals");
const Campaign = require("./db/modals")
//Insert a candidate into database
route.post("/add-candidate", (req, res) => {
        // validation without express-validator
        err = [];
        if (req.body.email === undefined || req.body.email === "") {
            err.push({ email_error: "email id required" });
        } else if (!validateEmail(req.body.email)) {
            err.push({ email_error: "email id is not valid" });
        }
        if (req.body.name === undefined || req.body.name === "") {
            err.push({ name_error: " name is required" });
        }
        if (err.length > 0) return res.json(err);

        //preparing user Object
        user = {
            name: req.body.name,
            email: req.body.email,
        };
        // console.log(user)

        //saving user to DB
        User.create(user, (err, doc) => {
            if (err) return res.json(err);
            return res.json(doc);
        });
 });

//Assign score for a candidate based on the test
route.put("/assign-score/:id", (req, res) => {
   
  
        if (req.body.score === undefined || req.body.score === "") {
            return res.json({ score_error: "score is required" });
        }
        

        //checking status of test of a candidate
        User.findOne({ _id: req.params.id }, (err, obj) => {
            if (err) return res.json(err);

                totalScore = 0
                score = parseInt(req.body.score)
            switch (true) {
            case obj.scores === undefined:
                // console.log("level 1");
                totalScore = totalScore + score
                console.log(totalScore) 
                pushTestInfo(1,score , totalScore , req , res);
                break;

            case obj.scores.length === 1:
                // console.log("level 2");
                totalScore = obj.total_score + score
                pushTestInfo(2,score , totalScore, req , res);
                break;

            case obj.scores.length == 2:
                // console.log("level 3");
                totalScore =  obj.total_score + score
                pushTestInfo(3,score , totalScore ,req , res);
                break;

            default:
                return res.json({msg:" User of Id  " + req.params.id + " Completed  All Level  "})
            }

            
        });
});



//highest-scoring-candidate
route.get('/highest-scoring-candidate' , (req, res)=>{
    User.findOne( ).sort('-total_score').exec((err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


// //Average score / rounde for all the candidates
// route.get('/average-score-per-round' , (req ,res)=>{
//      User.find(  (err , doc)=>{})   
// })


route.get('/get-campaign' , (req, res)=>{
     
        Campaign.find((err, doc)=>{
            return res.json(doc)
        } )
    
   
    
})






// utility functions
function pushTestInfo(level , score ,totalScore, req ,res) {
    scores = {
        level:  level,
        score: score,
      };
  User.updateOne(
    { _id: req.params.id },
    { $push: { scores: scores } , total_score:totalScore },
    (err, respons) => {
      if (err) return res.json(err);
      if(respons.ok){
        return res.json({msg: "Candidate appeared for  test level " + level + " with marks " + score + " Saved"});
      }
      
    }
  );
}

function validateEmail(email) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(email) == false) {
    return false;
  }

  return true;
}

module.exports = route;
