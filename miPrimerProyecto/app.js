const express=require("express");
const app=express();
const puerto=3001;

app.get("/contactos",(request,response)=>{
    response.send("get contactos");
})

app.listen(puerto,()=>{
    console.log("Servidor listo en el puerto "+3001)
});
