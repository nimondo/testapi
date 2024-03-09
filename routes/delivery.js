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
 *    security: 
 *      - bearerAuth: [] 
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
 *      - Delivery Module
 *    security: 
 *      - bearerAuth: [] 
 *    parameters:
 *       - name: delivery_id
 *         in: path
 *         description: delivery_id to search
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *    description: Get single delivery by delivery id
 *    delivery:
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
/**
 * @swagger
 * /api/deliveries:
 *  post:
 *    tags:
 *      - Delivery Module 
 *    description: Create dlivery
 *    requestBody:
 *      description: create delivery
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *        application/xml:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *      required: true
 *    responses:
 *      '201':
 *        description: Ressource created.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Bad request.
 *    schema:
 */
router.post('/', deliveryCtrl.createDelivery);
/**
 * @swagger
 * /api/deliveries/{delivery_id}:
 *  put:
 *    tags:
 *      - Delivery Module 
 *    security: 
 *      - bearerAuth: [] 
 *    parameters:
 *       - name: delivery_id
 *         in: path
 *         description: delivery_id to search
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *    description: Update delivery
 *    requestBody:
 *      description: Update delivery
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Delivery'
 *        application/xml:
 *          schema:
 *            $ref: '#/components/schemas/Delivery'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/Delivery'
 *      required: true
 *    responses:
 *      '201':
 *        description: Ressource updated.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Delivery'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/Delivery'
 *      '400':
 *        description: Bad request.
 *    schema:
 */
router.put('/:id', deliveryCtrl.updateDelivery);
/**
 * @swagger
 * /api/deliveries/{delivery_id}:
 *  delete:
 *    tags:
 *      - Delivery Module
 *    security: 
 *      - bearerAuth: [] 
 *    parameters:
 *       - name: delivery_id
 *         in: path
 *         description: delivery_id to search
 *         required: true
 *         schema:
 *           type: string
 *           format: string 
 *    description: delete delivery
 *    requestBody:
 *      description: delete delivery
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Delivery'
 *        application/xml:
 *          schema:
 *            $ref: '#/components/schemas/Delivery'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/Delivery'
 *      required: true
 *    responses:
 *      '201':
 *        description: Ressource deleted.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Delivery'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/Delivery'
 *      '400':
 *        description: Bad request.
 *    schema:
 */
router.delete('/:id', deliveryCtrl.deleteDelivery);




module.exports = router;