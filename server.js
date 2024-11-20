const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const transactionModel = require('./models/Transaction')
dotenv.config()
const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MongoDB is connected Successfully')
}).catch((err)=>{
    console.log('MongoDB connection Failed')
    
})

app.post('/transactions',async (req, res) => {
    try {
      const { amount,type,status,user} = req.body;
      const transaction = new transactionModel({ amount,type,status,user});
      await transaction.save();
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.get('/transactions/:id',async(req,res)=>{
  try{
    const user = await transactionModel.findById(req.params.id)
    res.status(200).send(user)
  }catch(err){
     console.log(err)
     res.status(402).send({message:"User doesn't exist"})
  }
})

app.put('/transactions/:id',async(req,res)=>{
  try{
    const updatedData = await transactionModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).send(updatedData)
  }catch(err){
    console.log(err)
    res.status(402).send({message:"User doesn't exist"})
  }
})

app.delete('/transactions/:id',async(req,res)=>{
  try{
    const removedUser = await transactionModel.findByIdAndDelete(req.params.id)
    res.status(200).send({message:"User deleted Successfully"})

  }catch(err){
    console.log(err)
    res.status(402).send({message:"User doesn't exist"})

  }
})



app.listen(5000,()=>{
    console.log(`Server is started and Running at ${5000}`)
})