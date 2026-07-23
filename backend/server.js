import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import {Product} from './models/Product.js';
dotenv.config();

const app=express();
const PORT=5000;

app.use(express.json());

app.get("/products",async(req,res)=>{
   try{
    const products=await Product.find({});
    res.status(200).json({data:products});
   }catch(error){
    res.status(500).json({message:"Server error",error:error.message});
   }
})

app.put("/products/:id",async(req,res)=>{
   try{
   const {id}=req.params;
   const updates=req.body;
   await Product.findByIdAndUpdate(id,updates);
   res.status(200).json({message:"Product updated successfully"});
   }catch(error){
    res.status(500).json({message:"Server error",error:error.message});
   }
})


app.post('/products',async(req,res)=>{
   const product=req.body;

   if(!product.name || !product.price || !product.image){
    return res.status(400).json({message:"All fiels are required"});
   }

   const newProduct=new Product(product);
   try{
    await newProduct.save();
    res.status(201).json({message:"Product created successfully",product:newProduct});
   }catch(error){
    res.status(500).json({message:"Server error",error:error.message});
   }

});


app.delete("/products/:id",async(req,res)=>{
   const {id}=req.params;

   try{
     await Product.findByIdAndDelete(id);
     res.status(200).json({message:"Product deleted successfully"});
   }catch(error){
      res.status(500).json({message:"Server error",error:error.message});
   }
})










app.listen(PORT,()=>{
 connectDB();
    console.log(`Server is running on port ${PORT}`);

})