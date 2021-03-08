const { response } = require('express');
const jwt = require('jsonwebtoken')

const validateJWT = ( req, res = response /*Ayuda la autocomplete*/, next ) => {

    // Get the JWT x-token headers

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Can not find token'
        })
    }

    try {

        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }

    next();

}

module.exports = {
    validateJWT
}