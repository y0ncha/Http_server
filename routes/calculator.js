const express = require('express');
const router = express.Router();
const controller = require('../controllers/calculatorCtrl');

router.get('/health', controller.health);

router.post('/independent/calculate', controller.independentCalculate);

router.get('/stack/size', controller.getStackSize);

router.put('/stack/arguments', controller.pushArgs);

router.get('/stack/operate', controller.stackCalculate);

router.delete('/stack/arguments', controller.popArgs);

router.get('/history', controller.fetchHistory);

module.exports = router;