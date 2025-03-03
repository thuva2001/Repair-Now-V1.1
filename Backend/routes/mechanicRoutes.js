// ShopsRoutes.js
import express from 'express';
import { isAdmin,protect } from '../middleware/authMiddleware.js';
import { createMechanic,deleteMechanicById,getMechanic,updateMechanicById,getMechanicById,gettrueMechanic} from '../controllers/mechanicController.js';

const router = express.Router();

import upload from '../utils/multer.js';


router.post('/createmechanic',upload.single("ShopPhoto"),createMechanic);
router.get('/getmechanic',getMechanic);
router.get('/getmechanics',gettrueMechanic);

router.get('/:id',getMechanicById);
router.put('/:id',updateMechanicById);
router.delete('/:id',deleteMechanicById);

export default router;
