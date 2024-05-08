const express= require("express");
const app=express();

app.get("/",(req,resp)=>{
    resp.send("Working");
})
con.query("SELECT * FROM `user`",(error,result)=>{
console.warn("result",result)
})

app.listen(5000)