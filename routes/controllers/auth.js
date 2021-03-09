const {response} = require('express');
const  bcrypt = require('bcryptjs');

const User = require('../../models/User');
const { generateJWT } = require('../../helpers/jwt');

const createUser = async(req, res = response /* only to keep the intellisense */) => {
    //return response only once
    // if( name.length < 5 ){
    //     return res.status(400).json({
    //         ok:false
    //     })
    // }
    
    const {email, password} = req.body;

    try {

        let user = await User.findOne({ email: email })

        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }

        user = new User( req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );


        await user.save();

        //generate JWT
        const token = await generateJWT(user.id, user.name)


        res.status(201).json({
            ok:true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: ''
        })
    }
}

const userLogin = async(req, res = response) => {

    const {email, password} = req.body

    try {
        //Check if email exists
        const user = await User.findOne({ email: email })

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'Incorret user/password'
            });
        }
        //Confirm passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            });
        }

        //Generate JWT
        const token = await generateJWT( user.id, user.name )

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: ''
        })
    }
}

const tokenRenew = async(req, res = response) => {

    const uid = req.uid
    const name = req.name

    const token = await generateJWT(uid, name)

    res.json({
        ok:true,
        uid,
        name, 
        json
    })
}

module.exports = {
    createUser,
    userLogin,
    tokenRenew
}