const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const deliveryCtrl = require('../controllers/delivery');


/**
 * @swagger
 * /api/deliveries:
 *  get:
 *    tags: 
 *      - Delivery Module
 *    description: Get all the deliveries from DB
 *    delivery:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Deliveries fetched successfully.
 *      '401':
 *        description: Token expired.
 */
router.get('/', auth, deliveryCtrl.getDeliveries);
/**
 * @swagger
 * /api/deliveries/{delivery_id}:
 *  get:
 *    tags: 
 *      - Deliveries Module
 *    description: Get single delivery by delivery id
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Delivery fetched successfully.
 *      '401':
 *        description: Token expired.
 *      '404':
 *        description: Ressource not found.
 */
router.get('/:id', deliveryCtrl.getOneDelivery);




module.exports = router;