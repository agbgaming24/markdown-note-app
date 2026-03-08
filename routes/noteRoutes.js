import express from 'express'
import * as noteController from "../controller/noteController.js"
import { upload } from '../middleware/uploads.js'


const router=express.Router();

router.post('/notes/check-grammar',noteController.checkGrammar);
router.post('/notes',noteController.saveNote)
router.get('/notes',noteController.getNote)
router.get('/notes/:id/render',noteController.renderNote)
router.post('/upload', upload.single('file'), noteController.uploadNote)

export default router