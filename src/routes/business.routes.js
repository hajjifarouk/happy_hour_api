const express = require('express');
const router = require('express-promise-router')();

const { validateBody,passBody, schemas,upload } = require('../helpers/routeHelpers');
const BusinessController = require('../controllers/business.controller');

router.route('/add')
    .post(passBody(), BusinessController.addBusiness);
router.route('/validate/:id')
    .put(passBody(), BusinessController.validateBusiness);
router.route('/invalidate/:id')
    .put(passBody(), BusinessController.invalidateBusiness);
router.route('/update/:id')
    .put(passBody(), BusinessController.updateBusiness);
router.route('/delete/:id')
    .delete(passBody(), BusinessController.deleteBusiness);
router.route('/getAll')
    .get(passBody(), BusinessController.getAllBusiness);
router.route('/getAllValid')
    .get(passBody(), BusinessController.getAllValidBusiness);
router.route('/getAllInvalid')
    .get(passBody(), BusinessController.getAllInvalidBusiness);
router.route('/getBusinessByOwner/:id')
    .get(passBody(), BusinessController.getBusinessByOwner);
router.route('/get/:id')
    .get(passBody(), BusinessController.getBusinessById);
router.route('/getByDistrict/:distrcit')
    .get(passBody(), BusinessController.getBusinessByDistrict);
router.route('/addImages/:id')
    .put(passBody(),upload.array('images'), BusinessController.addImages);
router.route('/deleteImage/:id')
    .delete(passBody(), BusinessController.deleteImage);
router.route('/addOffer/:id')
    .post(passBody(), BusinessController.addOffer);
router.route('/updateOffer/:id')
    .put(passBody(), BusinessController.updateOffer);
router.route('deleteOffer/:id')
    .delete(passBody(), BusinessController.deleteOffer);


module.exports = router;