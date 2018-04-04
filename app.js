const express=require("express");
const mysql=require("mysql");
const bodyParser=require("body-parser")
const app=express();
app.use(bodyParser.urlencoded())

var pool=mysql.createPool({
	host:"localhost",
	user:"root",
	password:"yanbin",
	database:"properties",
	port:3306
});




app.use('/bin',(req,res)=>{   
	res.setHeader('Access-Control-Allow-Origin','*')
   console.log(req.body)
   pool.getConnection((err,connection)=>{
		  if(err) throw err;
	connection.query(`SELECT * FROM building WHERE state='${req.body.state}'`,(err,rows)=>{
		   if (err) throw err;
			  console.log(rows)
			  connection.end()
		  res.send(rows);
  
	})
   })
  
  })  


  app.use("/list",function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	pool.getConnection(function(err,con){
		if(err){console.log(err)}
		con.query('select id,w,region,layout,price,state from building',function(err,rows){
			if(err){console.log(err)}
		console.log(rows)
		res.send(rows)
		con.end()
		})
	})
})
app.use('/del',function(req,res){
   res.setHeader('Access-Control-Allow-Origin','*');
    pool.getConnection(function(err,connection){
        if(err) throw err;
var sql='delete from building where id = (?)'
        connection.query(sql,[req.body.id],function(err,rows){
            if(err) throw err;
            res.send(rows);
connection.end()
        })
    })
})

app.use('/add',function(req,res){
   res.setHeader('Access-Control-Allow-Origin','*');
    pool.getConnection(function(err,connection){
        if(err) throw err;
		var sql='insert into building(w,region,layout,price,state) values(?,?,?,?,?)'
        connection.query(sql,[req.body.w,req.body.region,req.body.layout,req.body.price,req.body.state],function(err,rows){
            if(err) throw err;
            res.send('添加成功');
connection.end()
        })
    })
})
  app.listen(8000,()=>{
  console.log('启动。。。')
  })
  
  