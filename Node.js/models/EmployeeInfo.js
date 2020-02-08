const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const EmployeeInfoSchema=new Schema({
    EID: { type: Number },
    NAME: { type: String },
    AGE: { type: Number },
    PHONE: { type: String }
});

module.exports = mongoose.model('Employee', EmployeeInfoSchema); 