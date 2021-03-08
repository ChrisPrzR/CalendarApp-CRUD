const moment = require('moment');
const isDate = ( value ) => { //value comes from the express-validator "check" where we pass the value we are validating

        if(!value){
            return false
        }

        const date = moment( value )
        if( date.isValid()){
            return true
        }else{
            return false
        }
}

module.exports = {
    isDate
};