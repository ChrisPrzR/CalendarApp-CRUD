/*
    Rutas de usuarios / auth
    host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');
const router = express.Router()

const { fieldValidator } = require('../middlewares/field-validator');
const { createUser, userLogin, tokenRenew} = require('./controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt')       


router.post('/new',
            [ //middlewares
                check('name', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password debe ser de 6 o mas caracteres').isLength({min: 6}),
                fieldValidator
            ] , 
            createUser)

router.post('/', 
            [
                check('email', 'El email debe ser valido').isEmail(),
                check('password', 'Debe ser una contrasena valida').isLength({min:6}),
                fieldValidator
            ],     
            userLogin )

router.get( '/renew', validateJWT, tokenRenew )

module.exports = router;