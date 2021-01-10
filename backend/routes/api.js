const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const {
    validateRegisterUser,
} = require('../utils/validator')
//auth
const {authController} = require('../controllers/user');

router.post('/create/user', validateRegisterUser(), authController.createUser);
router.post('/login/user', authController.loginUser);
router.get('/users', authController.getAllUsers);
router.post('/upload/photo', checkAuth, authController.uploadUserPhoto);

const {recordsController} = require('../controllers/record');
router.post('/add/record', checkAuth, recordsController.createRecord);
router.get('/records', checkAuth, recordsController.getRecords);
router.get('/my/records', checkAuth, recordsController.getMyRecords);

const {newsController} = require('../controllers/news');

router.post('/add/news', checkAuth, newsController.createNews);
router.get('/get/news', checkAuth, newsController.getNews);


const {slotsController} = require("../controllers/slots");
router.post('/add/slot', slotsController.createSlot);
router.post('/get/slot', slotsController.getInfoSlots);

module.exports = router;
