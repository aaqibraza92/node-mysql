const express= require("express");
const app=express();
const con= require("./config")

app.use(express.json())
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


app.listen(5000)