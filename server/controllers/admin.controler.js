import Orders from "../models/orders.model.js";
import Product from "../models/product.model.js";



export const adminLogin = async (req,res) => {
    try {
        const {password} = req.body;

        if(!password){
            res.send({
                success: false,
                message: 'Password is required'
            })
        }
        else{
            if(password === 'iamtheadmin'){
                res.cookie('admins', 'adminloginsuccessfullyhewillmarrysydneysweeny', {maxAge: 60*60*24*1000, httpOnly: true, sameSite: 'strict'}).send({
                    success: true,
                    message: 'Admin logged in successfully',
                })
            }
            else{
                res.send({
                    success: false,
                    message: 'Incorrect password'
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}


export const createProduct = async (req,res) => {
    try {
        const {name, description, image, quantity, price} = req.body;
        
        if(!name || !description || !image || !quantity || !price){
            res.status(400).send({
                success: false,
                message: 'All fields are required'
            })
        }

        else{
            const newProduct = await Product.create({
                name,
                image,
                description,
                quantity,
                price
            })

            res.status(201).send({
                success: true,
                message: 'Product created successfully',
                data: newProduct
            })
        }

    } catch (error) {
        console.log(error)
    }
}


export const updateProduct = async (req,res) => {
    try {
        const {name, description, image, quantity, price} = req.body;
        const findProduct = await Product.findOne({name: name});

        if(findProduct){
            if(!name || !description || !image || !quantity || !price){
                res.status(400).send({
                    success: false,
                    message: 'All fields are required'
                })
            }

            const updPro = await Product.findOneAndUpdate({_id: findProduct._id}, {
                name,
                description,
                price,
                image,
                quantity
            }, {new: true})

            await updPro.save();

            res.send({
                success: true,
                message: 'Product updated successfully',
                updatedPro: updPro
            })
    
        }
        else{
            res.send({
                success: false,
                message: 'Product not found'
            })
        }


    } catch (error) {
        console.log(error)
    }
}

export const deleteproduct = async (req,res) => {
    try {
        const {proId} = req.body;

        const findProduct = await Product.findOne({_id: proId});

        if(findProduct){
            await Product.findByIdAndDelete(proId)
            res.send({
                success: true,
                message: 'Product deleted successfully'
            })
        }
        else{
            res.send({success: false, message: 'Product'})
        }
    } catch (error) {
        console.log(error)
    }
}


export const getAllProducts = async (req,res) => {
    try {

        const allProducts = await Product.find();

        res.send({
            success: true,
            allProducts: allProducts
        })

    } catch (error) {
        console.log(error)
    }
}

export const getAllOrders = async (req,res) => {
    try {
        const allOrders = await Orders.find().sort({createdAt: -1}).populate('customer')

        res.send({
            success: true,
            allOrders: allOrders
        })
    } catch (error) {
        console.log(error.message)
    }
}


export const sellerdone = async (req,res) => {
    try {
        const {orid} = req.body;
        
        const updOrder = await Orders.findOneAndUpdate({_id: orid}, {
            sellerdone: true,
        }, {new: true}).populate('customer')
        await updOrder.save();

        res.send({
            success: true,
            message: 'Order marked as sold',
            updatedOrder: updOrder
        })

    } catch(error) {
        console.log(error)
    }
}