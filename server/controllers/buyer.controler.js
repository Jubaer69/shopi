import Buyer from "../models/buyer.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import Orders from "../models/orders.model.js";
import Product from "../models/product.model.js";



dotenv.config();
import stripe from "stripe";

const stripex = new stripe(process.env.STRIPE_KEY);

export const buyerRegister = async (req, res) => {
    try {
        const {fullname, phone, district, location, password, email} = req.body;

        if(!fullname || !phone || !district || !location || !password || !email){
            res.send({
                success: false,
                message: 'All fields are required'
            })
        }
        else{
            const fuser = await Buyer.findOne({email: email})

            if(fuser){
                res.send({
                    success: false,
                    message: 'Email already exists'
                })
            }
            else{
                let saltRounds = 10;
                const hash = bcrypt.hashSync(password, saltRounds);
    
                const newBuyer = await Buyer.create({
                    fullname,
                    phone,
                    district,
                    location,
                    email,
                    password: hash
                })
    
                res.send({
                    success: true,
                    message: 'Buyer registered successfully',
                    buyer: newBuyer
                })
            }
           
        }
    } catch (error) {
        console.log(error)
    }
}


export const buyerLogin = async (req,res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password) {
            res.send({
                success: false,
                message: 'All fields are required'
            })
        }
        else{
            const findBuyer = await Buyer.findOne({email})

            if(findBuyer){
                const compare = await bcrypt.compare(password, findBuyer.password);



                if(compare){

                

                    const token = jwt.sign({fuckingid: findBuyer._id}, process.env.JWT_SECRET, {expiresIn: '2d'});


                    res.status(200).cookie('token', token, {httpOnly: true, sameSite: 'strict', maxAge: 1*24*60*60*1000}).send({
                        success: true,
                        message: "user logged in successfully",
                        buyer: findBuyer,
                        token: token
                    })
                }

                else{
                    res.send({
                        success: false,
                        message: 'Incorrect password'
                    })
                }
            }
            else{
                res.send({
                    success: false,
                    message: 'Email not found'
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}


export const buyerLogout =  async (req,res) => {
    try {
        res.clearCookie('token').send({
            success: true,
            message: 'successfully Logout'
        })
    } catch (error) {
        console.log(error)
    }
}


export const getMyOrders = async (req,res) => {
    try {
        const idx = req.id;
        const findx = await Orders.find({customer: idx}).sort({createdAt: -1})

        res.send({
            success: true,
            myOrders: findx
        })
    } catch (error) {
        console.log(error)
    }
}


export const processOrder = async (req,res) => {
    try {
        const {customer, items, total,  pm} = req.body;

        if(!customer || !items || !total || !pm) {
            res.send({
                success: false,
                message: 'All fields are required'
            })
        } 
        else{
            const newOrder = await Orders.create({
                customer,
                items,
                total,
                pm
            });

            newOrder.items.map(async (v, i) => {
                
                    
                        const update = await Product.findOneAndUpdate({_id: v.product._id}, {
                            quantity: v.product.quantity - v.quantity <= 0 ? 0 : v.product.quantity - v.quantity,
                            bikri: v.product.bikri + Number(v.quantity)
                        })
                        await update.save()    
            })

            res.send({
                success: true,
                message: 'Order placed successfully',
                order: newOrder
            })
        }


    } catch (error) {
        console.log(error.message)
    }
}

export const buyerdone = async (req,res) => {
    try {
        const {orid} = req.body;

        const updor = await Orders.findOneAndUpdate({_id: orid}, {
            buyerdone: true
        }, {new: true})
        await updor.save();

        res.send({
            success: true,
            message: 'Order marked as done',
            order: updor
        })
    } catch (error) {
        console.log(error.message)
    }
}



export const  stripecheck = async (req,res) => {
    try {
        const {items} = req.body;

        const lineitems = items.map(p => {
            return {
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: p.product.name,
                        images: [p.product.image],
                        description: p.product.description
                    },
                    unit_amount: Math.round((p.quantity * p.product.price) * 100)
                },
                quantity: p.quantity,
                
            }
        })

        const session = await stripex.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineitems,
            mode: 'payment',
            success_url: 'http://localhost:5173/payment/success',
            cancel_url: 'http://localhost:5173/payment/cancel'
        });

        res.send({id: session.id})
        
    } catch (error) {
        console.log(error.message)

    }
}