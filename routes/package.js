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




module.exports = router;