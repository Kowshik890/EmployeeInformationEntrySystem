const express=require("express");
const router=express.Router();
const Employee=require("../models/EmployeeInfo");

router.post('/api/v1/postEmployee', function (req,res) {
    Employee.create(req.body)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
            message: err.message || "Error while Saving Server Data"
        });
    });
});

router.get('/api/v1/getLastID',function(req,res){
    Employee.find().then(data => {
        var l=data.length;
        console.log(l);
         if(l==0){ 
            res.send({"message": 1});
         }
         else
         {
            Employee.find().sort({EID: -1}).limit(1)
            .then(res => {
                var a = res[0].EID;
                console.log('a: '+a);
                getMaxValue(a);
            })
        }
    }).catch(err => {
    res.status(500).send({
        message: err.message || "Error while Updating Server Data"
    });
  });

  function getMaxValue(a) {
      const b = Number(a) + 1;
    res.send({"message": b});
  }
});

router.get('/api/v1/getAllEmployee', function(req, res) {
    Employee.find().sort({EID:1})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error while Updating Server Data"
        });
    });
});

router.delete('/api/v1/deleteSingleEmployee/:EID', function(req, res){
    Employee.findOneAndDelete({'EID': req.params.EID})
    .then(data => {
        res.send(data);
    }).catch(err => {
    res.status(500).send({
        message: err.message || "Error while Updating Server Data"
    });
});
});

router.get('/api/v1/getSingleEmployee/:EID', function(req, res) {
    Employee.find({'EID': req.params.EID})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error while Updating Server Data"
        });
    });
});

router.put('/api/v1/updateSingleEmployee/:EID', function (req,res) {
    Employee.findOneAndUpdate({'EID': req.params.EID}, {
        NAME: req.body.NAME,
        AGE: req.body.AGE,
        PHONE: req.body.PHONE
    }).then(data => {
        console.log(data);
            res.send(data);
        }).catch(err => {
            res.status(500).send({
            message: err.message || "Error while Updating Server Data"
        });
    });
});

module.exports=router;