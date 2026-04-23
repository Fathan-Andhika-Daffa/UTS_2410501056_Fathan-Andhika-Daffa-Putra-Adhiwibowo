const express        = require('express');
const router         = express.Router();
const resepCtrl      = require('../controllers/resepController');
const validateResep  = require('../middlewares/validateResep');

router.get('/',    resepCtrl.getAll);

router.get('/:id', resepCtrl.getOne);

router.post('/',   validateResep, resepCtrl.create);

router.put('/:id', validateResep, resepCtrl.update);

router.delete('/:id', resepCtrl.remove);

module.exports = router;