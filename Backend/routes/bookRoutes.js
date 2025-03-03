//Booking Routes.js
import express from 'express';
// import { isAdmin,protect } from '../middleware/authMiddleware.js';
import { createorder,
     getBookById,
    getBook ,
    deleteBookById
} from '../controllers/bookController.js';

const router = express.Router();

router.post('/createorder', createorder);
router.get('/getbooks/:id',getBookById);
router.get('/getbooks',getBook);
router.delete('/:id',deleteBookById);



export default router;
