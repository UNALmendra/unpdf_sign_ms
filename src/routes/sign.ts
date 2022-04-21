import express from 'express';
import controller from '../controllers/sign';
const router = express.Router();

router.post('/postSign', controller.postSign);

export = router;
