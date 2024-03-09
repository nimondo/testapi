const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const packageCtrl = require('../controllers/package');


/**
 * @swagger
 * /api/package:
 *  get:
 *    tags: 
 *      - Package Module
 *    security: 
 *      - bearerAuth: [] 
 *    description: Get all the package from DB
 *    package:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Packages fetched successfully.
 *      '401':
 *        description: Token expired.
 */
router.get('/', auth, packageCtrl.getPackages);

/**
 * @swagger
 * /api/packages/{package_id}:
 *  get:
 *    tags: 
 *      - Package Module
 *    security: 
 *      - bearerAuth: [] 
 *    parameters:
 *       - name: package_id
 *         in: path
 *         description: package_id to search
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *    description: Get single package by packge id
 *    package:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Package fetched successfully.
 *      '401':
 *        description: Token expired.
 *      '404':
 *        description: Ressource not found.
 */
router.get('/:id', packageCtrl.getOnePackage);
/**
 * @swagger
 * /api/packages:
 *  post:
 *    tags:
 *      - Package Module 
 *    description: Create Package
 *    requestBody:
 *      description: create Package
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Package'
 *        application/xml:
 *          schema:
 *            $ref: '#/components/schemas/Package'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/Package'
 *      required: true
 *    responses:
 *      '201':
 *        description: Ressource created.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Package'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/Package'
 *      '400':
 *        description: Bad request.
 *    schema:
 */
router.post('/', packageCtrl.createPackage);
/**
 * @swagger
 * /api/packages/{package_id}:
 *  put:
 *    tags:
 *      - Package Module 
 *    security: 
 *      - bearerAuth: [] 
 *    parameters:
 *       - name: package_id
 *         in: path
 *         description: package_id to search
 *         required: true
 *         schema:
 *           type: string
 *           format: string
 *    description: Update package
 *    requestBody:
 *      description: Update package
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Package'
 *        application/xml:
 *          schema:
 *            $ref: '#/components/schemas/Package'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/Package'
 *      required: true
 *    responses:
 *      '201':
 *        description: Ressource updated.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Package'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/Package'
 *      '400':
 *        description: Bad request.
 *    schema:
 */
router.put('/:id', packageCtrl.updatePackage);
/**
 * @swagger
 * /api/packages/{package_id}:
 *  delete:
 *    tags:
 *      - Package Module
 *    security: 
 *      - bearerAuth: [] 
 *    parameters:
 *       - name: package_id
 *         in: path
 *         description: package_id to search
 *         required: true
 *         schema:
 *           type: string
 *           format: string 
 *    description: delete Package
 *    requestBody:
 *      description: delete Package
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Package'
 *        application/xml:
 *          schema:
 *            $ref: '#/components/schemas/Package'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/Package'
 *      required: true
 *    responses:
 *      '201':
 *        description: Ressource deleted.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Package'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/Package'
 *      '400':
 *        description: Bad request.
 *    schema:
 */
router.delete('/:id', packageCtrl.deletePackage);




module.exports = router;