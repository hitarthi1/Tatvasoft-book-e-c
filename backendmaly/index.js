const express = require('express');
const cors = require('cors');
const Pool = require('pg').Pool;
const app = express(); 

//middleware
app.use(express.json());
app.use(cors());

var pool = new Pool({
    database: 'BookStoreDB',
    user: 'postgres',
    host:"localhost",
    password: '1234',
    port: 5432,
   // ssl: true,
    max: 20, // set pool max size to 20
   idleTimeoutMillis: 10000, // close idle clients after 1 second
    connectionTimeoutMillis: 10000, // return an error after 1 second if connection could not be established
    maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
})

// Make list API
// app.get('/doctors', async (req, res)=>{
//     const doctors =await pool.query("SELECT * FROM role");
//     console.log(doctors.rows);

//     if(doctors.rows.length > 0){
//       //  res.send(doctors);
//         res.json(doctors.rows);
//     }else{
//         res.send({result: "No Doctor Found !!!"})
//     }
// })

//  ---------------------------------------------------------------------auth---
app.post('/api/BookStore/Login', async (req, res)=>{
    const  email=req.body.email;
    const password=req.body.password;
    const ret =await pool.query(`SELECT * FROM "user" WHERE email=$1 AND password=$2;`,[email,password]);
   // console.log(ret);
   if(ret.rowCount==1){
   // res.send(ret);
    res.status(200).json({ status: 'authorized',re:ret });;
   }
})
 
app.post('/api/BookStore/RegisterUser', async (req, res)=>{
    console.log(req.body.firstName);
    
    const firstname=req.body.firstName;
    const  lastname=req.body.lastName;
    const email=req.body.email;
    const password=req.body.password;
    const  roleid= 3;

   const ret =await pool.query(`INSERT INTO "user" ("firstname","lastname","email","password","roleid") VALUES($1,$2,$3,$4,$5)`,[firstname,lastname,email,password,roleid]);
  // res.JSON("REGISTERED!!");
   console.log(ret);
  // console.log(firstname,lastname,email,password,roleid);
res.send("jddjhgjdr");
  
})



//  ---------------------------------------------------------------------book---
app.get('/book/Search', async (req, res)=>{
   // const  name=req.body.name;
   
const keyword= req.query.keyword;
const query= req.query;
console.log({query})
  //  const ret =await pool.query(`SELECT * FROM "book" WHERE name=$1 ;`,[name]);
  //  if(keyword !='' || keyword!=undefined){
    if(keyword !=''){
  
      const ret =await pool.query(`SELECT *,category.name AS cat ,book.name AS bookname FROM "book" LEFT JOIN  "category" ON book.categoryid = category.id WHERE book.id IN (SELECT id from book WHERE name LIKE '%'||$1||'%' ) ;`,[keyword]);
      res.send(ret.rows);
    }else{
      const ret =await pool.query(`SELECT *,category.name AS cat ,book.name AS bookname FROM "book" LEFT JOIN  "category" ON book.categoryid = category.id ;`);
      res.send(ret.rows);
    
    }

    
    // console.log("asdfghjkl;",ret.rows);
 //  res.send(ret.rows);
})

app.get('/book/getById', async (req, res)=>{
   // const  id=req.body.id;
    const id = req.query.id;
    const ret =await pool.query(`SELECT * FROM "book" WHERE id=$1 ;`,[id]);
    // console.log(ret.rows);
   res.send(ret.rows);
})

app.delete('/book/delete', async (req, res)=>{
    //const  id=req.body.id;
    const id = req.query.id;
    const ret =await pool.query(`DELETE FROM "book" WHERE id=$1 ;`,[id]);
    // console.log(id);
  res.send("fgdhsjkal");
  res.status(200);
})

app.put('/book/update', async (req, res)=>{
    console.log(req.body);
    const id =req.body.id;
    const name=req.body.name;
    const price=req.body.price;
    const description=req.body.description;
    const base64image=req.body.base64image;
    const categoryid=req.body.category;
    //const categoryid=5;
    const ret =await pool.query(`UPDATE "book" SET "name"=$1,"price"=$2,"description" =$3,"base64image"=$4 ,"categoryid"=$5 WHERE id=$6`,[name,price,description,base64image,categoryid,id]);

  // const ret =await pool.query(`UPDATE "book" SET ("name","price","description","base64image","categoryid") VALUES($1,$2,$3,$4)`,[name,price,description,base64image,categoryid]);
 
  // console.log(ret);
   console.log(req);
  // console.log(firstname,lastname,email,password,roleid);
res.send("jddjhgjdr");
})

app.post('/book/create', async (req, res)=>{
    console.log(req.body);
    
    //const id =req.body.id;
    const name=req.body.name;
    const price=req.body.price;
    const description=req.body.description;
    const base64image=req.body.imageSrc;
    const categoryid=req.body.category;
   // const categoryid=5;
   const ret =await pool.query(`INSERT INTO "book" ("name","price","description","base64image","categoryid") VALUES($1,$2,$3,$4,$5)`,[name,price,description,base64image,categoryid]);
 
   console.log(ret);
  // console.log(firstname,lastname,email,password,roleid);
res.send("jddjhgjdr");



})



//  ---------------------------------------------------------------------category---
app.get('/category/Search', async (req, res)=>{
    //const  name=req.body.name;
   
// const name = req.query;
    //const ret =await pool.query(`SELECT * FROM "category" WHERE name=$1 ;`,[name]);
    const ret =await pool.query(`SELECT * FROM "category"  ;`);
    // console.log();
   res.send(ret.rows);
})

app.get('/category/getById', async (req, res)=>{
    const  id=req.query.id;
   // const  id=req.body.id;

   
    const ret =await pool.query(`SELECT name FROM "category" WHERE id=$1 ;`,[id]);
     console.log(id,ret.rows);

   res.send(ret.rows);
})

app.delete('/category/delete', async (req, res)=>{
    const  id=req.query.id;
   
    const ret =await pool.query(`DELETE FROM "category" WHERE id=$1 ;`,[id]);
    // console.log(id);
   res.send(ret);
})

app.get('/category/categoryOptions', async (req, res)=>{
   
    const ret =await pool.query(`SELECT * FROM "category";`);
   
   res.send(ret.rows);
})

app.put('/category/update', async (req, res)=>{
   //console.log(req.body.id);
    
    const name=req.body.name;
    const id=req.body.id;
    console.log({name},{id})
   const ret =await pool.query(`UPDATE "category" SET "name"=$1 WHERE id=$2`,[name,id]);

   //const ret =await pool.query(`UPDATE"category" SET ("name") VALUES($1)`,[name]);

   //console.log(ret.rows);

    //res.send(ret);
})

app.post('/category/create', async (req, res)=>{
    console.log(req.body.name);
    
    const name=req.body.name;
   const ret =await pool.query(`INSERT INTO "category" ("name") VALUES($1)`,[name]);

  // console.log(ret);

    res.send(ret);
})





//  ---------------------------------------------------------------------user---
app.get('/user/Search', async (req, res)=>{

   const ret =await pool.query(`SELECT * FROM "user" ;`);
    res.send(ret.rows);

    //console.log(ret.rows)
})

app.get('/user/UserRoles', async (req, res)=>{
   
    const ret =await pool.query(`SELECT * FROM "role" ;`);
    // console.log(id);
   res.send(ret.rows);
})

app.get('/user/getById', async (req, res)=>{
   // const  id=req.body.id;
    const id = req.query.id;
    const ret =await pool.query(`SELECT * FROM "user" WHERE id=$1 ;`,[id]);
     console.log(id);
     //console.log(filters);
   res.send(ret.rows);
})

app.delete('/user/delete', async (req, res)=>{
    const id = req.query.id;
    
   
    const ret =await pool.query(`DELETE FROM "user" WHERE id=$1 ;`,[id]);
    // console.log(id);
   res.send(ret);
})

app.put('/user/update', async (req, res)=>{
   
    console.log(req.body.firstName);
    
    const firstname=req.body.firstName;
    const  lastname=req.body.lastName;
    const email=req.body.email;
    //const password=req.body.password;
    const  roleid=req.body.roleId ;
    const  id= req.body.id;

    // res.JSON("REGISTERED!!");
  //  const ret =await pool.query(`UPDATE "user" SET ("firstname","lastname","email","password","roleid")  WHERE id=$6 VALUES($1,$2,$3,$4,$5) `,[firstname,lastname,email,password,roleid]);
    const ret =await pool.query(`UPDATE "user" SET "firstname"=$1,"lastname"=$2,"email" =$3,"roleid"=$4  WHERE id=$5`,[firstname,lastname,email,roleid,id]);
   // console.log("dfgdfgdfgdfgdfgdfg");
   console.log(firstname,lastname,email,roleid,id);
res.send("jddjhgjdr");
})






//  ---------------------------------------------------------------------cart---

app.get('/cart/Search', async (req, res)=>{

  if(req.query.keyword){
   const keyword=req.query.keyword;
   const ret =await pool.query(`SELECT * FROM "cart" WHERE bookid=;`);
   res.send(ret.rows);

  }
  else if(req.body.userid){
  const ret =await pool.query(`SELECT * FROM "cart" WHERE userid=$1 ;`,[userid]);
   res.send(ret.rows);
  }
  else if(req.body.userid &&req.query.keyword ){
    const ret =await pool.query(`SELECT * FROM "cart"  WHERE userid=$1  AND bookid=$2  `,[userid,bookid]);
   res.send(ret.rows);

  }
  else {
    const ret =await pool.query(`SELECT * FROM "cart" ;`);
   res.send(ret.rows);
  }
   //console.log(ret.rows)
})  
app.delete('/cart/delete', async (req, res)=>{
  const id = req.body.id;
  const ret =await pool.query(`DELETE FROM "cart" WHERE id=$1 ;`,[id]);
  // console.log(id);
 res.send("deleted");
})
app.put('/cart/update', async (req, res)=>{
   
  console.log(req.body.firstName);
  
  const bookid=req.body.bookid;
  const  quantity=req.body.quantity;
  const userid=req.body.userid;
 
  // res.JSON("REGISTERED!!");
//  const ret =await pool.query(`UPDATE "user" SET ("firstname","lastname","email","password","roleid")  WHERE id=$6 VALUES($1,$2,$3,$4,$5) `,[firstname,lastname,email,password,roleid]);
  const ret =await pool.query(`UPDATE "cart" SET "quantity"=$1 WHERE bookid=$2 AND userid=$3`,[quantity,bookid,userid]);
 // console.log("dfgdfgdfgdfgdfgdfg");
 console.log(bookid,quantity,userid);
res.send("jddjhgjdr");
})
app.post('/cart/create', async (req, res)=>{

  const userid=req.body.userid;
  const bookid=req.body.bookid;
  const quantity=req.body.quantity;
 const ret =await pool.query(`INSERT INTO "cart" ("userid","bookid","quantity") VALUES($1,$2,$3)`,[userid,bookid,quantity]);
// console.log(ret);
  res.send(ret);
})








app.listen(5000);
// const filters = req.query;



// let info = await DoctorInfo.find();

// if (filters.Area && filters.Specialization) {
//   info = await DoctorInfo.find({
//     Area: filters.Area,
//     Specialization: filters.Specialization,
//   });
// } else if (filters.Area) {
//   info = await DoctorInfo.find({ Area: filters.Area });
// } else {
//   info = await DoctorInfo.find({ Specialization: filters.Specialization });
// }

// res.send(info);