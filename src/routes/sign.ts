import express from 'express';
import controller from '../controllers/sign';
const router = express.Router();

router.post('/postSign', controller.postSign);
router.post('/postSign2Pdf', controller.postSign2Pdf);

export = router;
