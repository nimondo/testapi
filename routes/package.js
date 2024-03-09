const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const packageCtrl = require('../controllers/package');


/**
 * @swagger
 * /api/deliveries:
 *  get:
 *    tags: 
 *      - Delivery Module
 *    description: Get all the delivs from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Claims fetched successfully.
 *      '401':
 *        description: Token expired.
 */
router.get('/', auth, claimCtrl.getClaims);
/**
 * @swagger
 * /api/consultation:
 *  get:
 *    tags: 
 *      - Consultation Module
 *    description: Get all the consultation
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Consultation fetched successfully.
 *      '401':
 *        description: Token expired.
 */
router.get('/', auth, claimCtrl.getClaims);
/**
 * @swagger
 * /api/claims:
 *  get:
 *    tags: 
 *      - Claims Module
 *    description: Get all the claims from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Claims fetched successfully.
 *      '401':
 *        description: Token expired.
 */
router.get('/', auth, claimCtrl.getClaims);
/**
 * @swagger
 * /api/claims/{claimId}:
 *  get:
 *    tags: 
 *      - Claims Module
 *    description: Get single claim by claim id
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Claim fetched successfully.
 *      '401':
 *        description: Token expired.
 *      '404':
 *        description: Ressource not found.
 */
router.get('/:id', claimCtrl.getOneClaim);




module.exports = router;