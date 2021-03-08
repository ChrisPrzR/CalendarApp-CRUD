/*
 Event Routes
 /api/events
*/

const express = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const { fieldValidator } = require('../middlewares/field-validator')
const { validateJWT } = require('../middlewares/validate-jwt'); 

const { getEvents, createEvent, updateEvent, deleteEvent }  = require('./controllers/events');

const router = express.Router();

router.use( validateJWT )

router.get('/', getEvents )

router.post('/',
            [
                check('title', 'El titulo es obligatorio').not().isEmpty(),
                check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
                check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
                fieldValidator
            ],
            createEvent )

router.put('/:id',
            [
                check('title', 'El titulo es obligatorio').not().isEmpty(),
                check('start', 'Fecha de inicio es obligatoria').custom(isDate),
                check('end', 'Fecha de finalización es obligatoria').custom(isDate),
                fieldValidator
            ],
            updateEvent )

router.delete('/:id', deleteEvent )

module.exports = router;
