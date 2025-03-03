import asynchandler from 'express-async-handler';
import Book from '../models/bookModel.js';
import mongoose from 'mongoose';
import twilio from 'twilio';
import Mechanic from '../models/mechanicModel.js';
import dotenv from 'dotenv';
dotenv.config();
// @desc Create a new mechanic
// route POST /api/mechanic/create shop
// @access Public 

// Twilio credentials
const accountSid = process.env.TWILIO;
const authToken = '51f79b8a8eae089aa89e7535fc5edbb9';
const twilioPhoneNumber = 'whatsapp:+14155238886';
const mechanicPhoneNumber='whatsapp:+94768646159'

const client = new twilio.Twilio(accountSid, authToken);

// Create order route handler
const createorder = asynchandler(async (req, res) => {
  const { CustomerName, Location, ContactNumber, VehicleType, Problem, id } = req.body;

  // Find the mechanic based on the provided id
  const mechanic = await Mechanic.findById(id);

  if (!mechanic) {
    return res.status(404).json({ message: 'Mechanic not found' });
  }

  // Create a new order
  const newOrder = {
    CustomerName,
    Location,
    ContactNumber,
    VehicleType,
    Problem,
    MechanicId: id
  };

  try {
    // Save the new order
    const book = await Book.create(newOrder);

    // Send SMS notification to the mechanic
    await client.messages.create({
      body: `New order created: Customer - ${CustomerName}, Location - ${Location}, ContactNumber - ${ContactNumber}, VehicleType - ${VehicleType}, Problem - ${Problem}`,
      from: twilioPhoneNumber,
      to: mechanicPhoneNumber // Send SMS to mechanic's phone number
    });

    return res.status(201).json({ message: 'Your Order Sent', book });
  } catch (error) {
    console.error('Error creating order or sending SMS notification:', error);
    return res.status(500).json({ message: 'Error creating order or sending SMS notification' });
  }
});


   // // @desc Get all orders
  // // route GET /api/mechanic/getmechanic
  // // @access Private
  
  const getBook = async (req, res) => {
    const findbook = await Book.find({});
    try {
      res.json(findbook);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

    // @desc Get a single shop by ID
  // route GET /api/mechanic/ id
  // @access Private
  
  // const getBookById = async (req, res) => {
  //   const bookId = await Book.findById(req.params.id);
  
  //   if (bookId) {
  //     res.json(bookId);
  //   } else {
  //     res.status(404);
  //     throw new Error('book not found');
  //   }
  // };
    
  const getBookById = async (req, res) => {
    try {
      const bookId = await Book.findById(req.params.id);
  
      if (!bookId) {
        return res.status(404).json({ message: 'booking not found' });
      }
  
      res.status(200).json(bookId);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

// @desc Delete order by ID
  // route DELETE /api/book/:id
  // @access Private 
  
  const deleteBookById = asynchandler(async (req, res) => {
    const {id} =req.params;
    
     try  {
       const bookdelete= await Book.findOneAndDelete(id)
       res.json({ message: 'Book removed',bookdelete });
     } catch {
       res.status(404);
       throw new Error('Book not found');
     }
   
     
   
   });
   


  export{createorder, 
     getBookById,
    getBook,
  deleteBookById};