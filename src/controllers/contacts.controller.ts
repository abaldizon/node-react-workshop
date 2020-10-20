import {Request, Response,Router} from 'express';
import { ErrorHandler, handleError } from '../error';
import auth_token from '../middlewares/auth/auth.midd';
import validationHandler from '../middlewares/validator';
import post_valid from '../middlewares/validators/contact/post';
import put_valid from '../middlewares/validators/contact/put';
import contacts from '../models/contacts';
import Contact from '../models/contacts';

const router = Router();

router.get('/',auth_token, async(req:Request, res:Response)=> {
    try {
        const contacts = await Contact.find({user: req.user?.id}).sort({date:-1});
        return res.status(200).json({
            data: contacts,
            msj: 'List of Contacts'
        })
    } catch (err) {
        console.log(err);
        const custom = new ErrorHandler(500, 'Server Error');
        handleError(custom, req, res)
    }
})

router.post('/',auth_token, post_valid, validationHandler, async(req:Request, res:Response)=> {
    const { name,email,phone,type } = req.body;
    try {
        let newContact = new Contact({
            user: req.user?.id,
            name,
            email,
            phone,
            type
        });

        const contact = await newContact.save();

        return res.status(200).json({
            data: contact,
            msj: 'Contact Created'
        })
        
    } catch (err) {
        console.log(err);
        const custom = new ErrorHandler(500, 'Server Error');
        handleError(custom, req, res)
    }
})

router.put('/',auth_token, put_valid, validationHandler, async(req:Request, res:Response)=> {
    const { name,email,phone,type } = req.body;

    try {
        const contactFields: any = {};
        if (name) contactFields.name = name;
        if (email) contactFields.email = email;
        if (phone) contactFields.phone = phone;
        if (type) contactFields.type = type;

        let contact = await Contact.findById(req.query.id);
        if (!contact) {
            const custom = new ErrorHandler(404, 'Contact not found');
            handleError(custom, req, res)
        }
        
        if (contact?.user.toString() !== req.user?.id) {
            const custom = new ErrorHandler(401, 'Not Authorized');
            handleError(custom, req, res)
        }

        contact = await Contact.findByIdAndUpdate(req.query.id, {$set: contactFields},{new:true});

        return res.status(200).json({
            data:contact,
            msj:'Contact Updated'
        });
    } catch (err) {
        console.log(err);
        const custom = new ErrorHandler(500, 'Server Error');
        handleError(custom, req, res)
    }
})

router.delete('/:id',auth_token, async(req:Request, res:Response)=> {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            const custom = new ErrorHandler(404, 'Contact not found');
            handleError(custom, req, res)
        }
        if (contact?.user.toString() !== req.user?.id) {
            const custom = new ErrorHandler(401, 'Not Authorized');
            handleError(custom, req, res)
        }

        contact = await Contact.findByIdAndRemove(req.params.id);
        return res.status(200).json({
            data:contact,
            msj: 'Contact Deleted'
        })

    } catch (err) {
        console.log(err);
        const custom = new ErrorHandler(500, 'Server Error');
        handleError(custom, req, res)
    }
})


export default router;