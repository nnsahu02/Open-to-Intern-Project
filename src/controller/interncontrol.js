
const CollegeModel = require('../models/collegemodel')
const InternModel = require("../models/internmodel")

// creating intern data

exports.createIntern = async (req, res) => {

    try {
        let internData = req.body
        let {name, email, mobile} = {...internData}
        let collegeName = internData.collegeName;

        let findCollege = await collegemodel.findOne({name:collegeName})
        if(!findCollege) 
        {return res 
        .status(404)
        .send({status:false,msg:"college dose not exist"})}

        let collegeId=findCollege["_id"]
        let toCreateIntern = {name,mobile,email,collegeId}

        let saveData = await InternModel.create(toCreateIntern)
        return res.status(201).send({ status: true, data: saveData })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


exports. getCollegeIntern = async (req,res)=>{
    try {
        const collegeName = req.query.collegeName
        if(!collegeName)
        return res
        .status(400)
        .send({status:false,msg:"please send the collegeName from quires"})

        let collegeDetails = await collegemodel.findOne(
            {$or:[ 
                {name:collegeName},
                {fullName:collegeName}],
                 isDeleted:false
            })
        if(!collegeDetails) 
        return res
        .status(404)
        .send({status :false, msg:"college not exist"})
         
        let objectOfCollegeDetails = collegeDetails.toObject()
        let {name ,fullName ,logoLink}={...objectOfCollegeDetails}

        let interDetails = await internmodel
        .find({ collegeId:collegeDetails._id,isDeleted:false})
        .select({name:1,email:1,mobile:1})

        if(!interDetails[0]){
            return res
            .status(404)
            .send({Status:false , msg:"no  intern applied for this college"})
        }
        let internOf_a_college={
            name,
            fullName,
            logoLink,
            inter:interDetails
        }

        return res
        .status(200)
        .send( {status:true , data:internOf_a_college})
        
    } catch (error) {
        res.status(500).send({ message: error.message, status: false })
    }
}
