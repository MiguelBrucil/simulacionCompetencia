const express = require ('express');
const app = express();

app.get('/user-list', (req,res)=>{
const userList = [];

res.send(userList);
});
app.post('/user-List',(req,res)=>{
const userList = req.body;
res.send({
    message:'new user',
})
});