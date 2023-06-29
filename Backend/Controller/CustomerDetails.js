const connection = require("../Model/model");

const getCustomerDetails = async(req,res)=>{
    try{
        let sqlQury= "SELECT * FROM customer_details";
        let data = req.body;
         await connection.query(sqlQury,data,function(error,result){
         if(error){
             console.log("Error", error.sqlMessage);
         }
         else{
             res.json(result);
         }
        })
    }catch(error){
        console.log(error.message);
    }      
};

const postCustomerDetails = async(req,res)=>{
    try{
        let sqlQury= "insert into customer_details SET?";
        let data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile
        }
        // console.log(firstname,lastname,mobile,email)
         await connection.query(sqlQury,data,function(error,result){
         if(error)
         {
             console.log("Error", error.sqlMessage);
         }
         else
         {
             res.json(result);
         }
        })
    }catch(error){
        console.log(error.message);
    }      
};

const updateCustomerDetails = async(req,res)=>{
    try{
      
        let sqlQury= "UPDATE  customer_details SET? WHERE mobile=?";
        let data = {
           
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email:req.body.email, 
          
        }
   
        let id = req.params.mobile;
         await connection.query(sqlQury,[data,id],function(error,result){
         if(error)
         {
             console.log("Error", error.sqlMessage);
         }
         else
         {
             res.json(result);
         }
        })
    }catch(error){
        console.log(error.message);
    }      
};

const deleteCustomerDetails = async(req,res)=>{
    try{
        
        let sqlQury= "DELETE FROM customer_details WHERE mobile=?";
        let id = req.params.mobile;
         await connection.query(sqlQury,id,function(error,result){
         if(error)
         {
             console.log("Error", error.sqlMessage);
         }
         else
         {
             res.json(result);
         }
        })
    }catch(error){
        console.log(error.message);
    }      
};





module.exports ={getCustomerDetails,postCustomerDetails,updateCustomerDetails,deleteCustomerDetails}