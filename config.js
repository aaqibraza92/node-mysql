const mysql = require("mysql");

const con= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
}) 

con.connect((err)=>{
if(err){
console.log(err)
}else{
    console.log("Connected")
}
})

module.exports=con;