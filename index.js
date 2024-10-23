const express=require('express')
const app=express()

app.use(express.json())

const {open}=require('sqlite')
const sqlite3=require('sqlite3')

const path=require('path')
const dbpath=path.join(__dirname,'productcost.db')


let db;

const initializeConnection=async ()=>{
  try {

     db=await open({
       filename:dbpath,
       driver:sqlite3.Database
      })

      app.listen(3004,()=>{
        console.log('Server is running at http://localhost:3004')
      })
   }
   catch(e){
    console.log(`The Error Message is ${e}`)
   }

}

initializeConnection()


app.get('/get-products-price',async (req,res) => {
    const dbQuery = `SELECT SUM(price) AS TOTAL_PRICE FROM products;`
    const dbRes = await db.all(dbQuery)
    const totalPrice=dbRes[0]
    res.send(totalPrice)

})