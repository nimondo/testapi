const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    tags:
 *      - User Module 
 *    description: Returns a single person based on their JWT token
 *    operationId: Login user
 *    requestBody:
 *      description: Login user
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
router.post('/signup', userCtrl.signup);
/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *    tags:
 *      - User Module 
 *    description: Returns a single person based on their JWT token
 *    operationId: Login user
 *    requestBody:
 *      description: Login user
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
 *              $ref: '#/components/schemas/Token'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/Token'
 *      '401':
 *        description: Bad credentials.
 *      '400':
 *        description: Bad request.
 *components:
 *  schemas:
 *    User:
 *         required:
 *          - email
 *          - password
 *          - role
 *         type: object
 *         properties:
 *          email:
 *             type: string
 *             example: fygui
 *          password:
 *             type: string
 *          role:
 *             type: string
 *             example: customer
 *             enum: ['customer', 'driver', 'admin']
 *         xml:
 *           name: order
 *    Token:
 *         type: object
 *         properties:
 *          token:
 *             type: string
 *             example: fygui
 *          userId:
 *             type: string
 *          role:
 *             type: string
 *         xml:
 *           name: order
 */
router.post('/login', userCtrl.login);

module.exports = router;