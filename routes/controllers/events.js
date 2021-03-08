const {response} = require('express');
const Event = require('../../models/Event')

// {
//     ok: true,
//     msg: 'get event'
// }

const getEvents = async( req, res = response) => {
    
    const events = await Event.find().populate('user', 'name')

    res.status(201).json({
        ok: true,
        events
    })
}

const createEvent = async( req, res = response ) => {

    const event = new Event( req.body );

    try {
        event.user = req.uid

        const savedEvent = await event.save()

        res.json({
            ok: true,
            event: savedEvent
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Something happened'
        })
    }
}

const updateEvent = async( req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'Id not found'
            })
        }

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'You do not have edit privileges'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }
        
        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.status(201).json({
            ok: true,
            evento: updatedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Oops, something happened'
        });
    }

}

const deleteEvent = async ( req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId)

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'Id not found'
            })
        }

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to do this'
            });
        }

        event.delete()

        res.status(201).json({
            ok: true,
            msg: 'Deleted!'
        })
      
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something happened'
        })

    }
    
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}