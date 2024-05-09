const express= require("express");
const app=express();
const con= require("./config")
const multer  = require('multer')
const path = require('path');
app.use(express.json())

// const upload = multer({ dest: 'uploads/' })

const upload= multer({
    storage: multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,"uploads") //folder name
        },
        // filename: function(req,file,cb){
        //     cb(null,file.fieldname+ "-"+Date.now()+".jpg" || null,file.fieldname+ "-"+Date.now()+".png")
        // }
        filename: (req, file, cb) => {
            // Generate a unique filename for the uploaded file
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix + ext);
          }

    })
}).single("user_file") 

app.get("/users",(req,resp)=>{
    con.query("SELECT * FROM `user`",(error,result)=>{
        if(error){
            resp.send({
                status: "2",
                msg: "failed"
            })
        }else{
            resp.send({status : "1",msg: "success", data:result})
        }
        }) 
})

app.post("/users",(req,resp)=>{
    const data=req.body //yaha se object aega
    con.query("INSERT INTO user SET ?",data,(error,result,field)=>{
        if(error){
            resp.send({
                status: "2",
                msg: "failed"
            })
        }else{
            resp.send({status : "1",msg: "data posted", data:result})
        }
    })
})

app.put("/users/:id",(req,resp)=>{
    const updateData=[req.body.name,req.body.email,req.body.mobile,req.params.id]
    con.query("UPDATE user SET name= ?, email =? , mobile=? where id= ?",updateData,(error,result,field)=>{
        if(error){
            resp.send({
                status: "2",
                msg: "failed"
            })
        }else{
            resp.send({status : "1",msg: "data updated", data:result})
        }
    })
})

app.delete("/users/:id",(req,resp)=>{
    con.query("DELETE FROM user WHERE id ="+req.params.id,(error,result)=>{
        if(error){
            resp.send({
                status: "2",
                msg: "failed"
            })
        }else{
            resp.send({status : "1",msg: "data deleted", data:result})
        }
    })

})

app.post("/upload",upload,(req,resp)=>{

    console.log("ress",resp.req.file.filename)
    resp.status(200).json({
        success: true,
        msg: "done"
    })
    // resp.send(resp.json())
})


app.listen(5000)