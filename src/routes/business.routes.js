const express = require('express');
const router = require('express-promise-router')();

const { validateBody,passBody, schemas,upload,nocache } = require('../helpers/routeHelpers');
const BusinessController = require('../controllers/business.controller');

router.route('/add')
    .post(nocache, BusinessController.addBusiness);
router.route('/validate/:id')
    .put(nocache, BusinessController.validateBusiness);
router.route('/invalidate/:id')
    .put(nocache, BusinessController.invalidateBusiness);
router.route('/update/:id')
    .put(nocache, BusinessController.updateBusiness);
router.route('/delete/:id')
    .delete(nocache, BusinessController.deleteBusiness);
router.route('/getAll')
    .get(nocache, BusinessController.getAllBusiness);
router.route('/getAllValid')
    .get(nocache, BusinessController.getAllValidBusiness);
router.route('/getAllInvalid')
    .get(nocache, BusinessController.getAllInvalidBusiness);
router.route('/getBusinessByOwner/:id')
    .get(nocache, BusinessController.getBusinessByOwner);
router.route('/get/:id')
    .get(nocache, BusinessController.getBusinessById);
router.route('/getByDistrict/:distrcit')
    .get(nocache, BusinessController.getBusinessByDistrict);
router.route('/addImages/:id')
    .put(nocache,upload.array('images'), BusinessController.addImages);
router.route('/deleteImage/:id/:image')
    .delete(nocache, BusinessController.deleteImage);
router.route('/addOffer/:id')
    .post(nocache, BusinessController.addOffer);
router.route('/updateOffer/:id')
    .put(nocache, BusinessController.updateOffer);
router.route('/deleteOffer/:id')
    .delete(nocache, BusinessController.deleteOffer);
module.exports = router;