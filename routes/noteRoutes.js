import express from 'express'
import * as noteController from "../controller/noteController.js"

const router=express.Router();

router.post('/notes/check-grammar',noteController.checkGrammer);
router.post('/notes',noteController.saveNote)
router.get('/notes',noteController.getNote)
router.get('/notes/:id/render',noteController.renderNote)

export default router