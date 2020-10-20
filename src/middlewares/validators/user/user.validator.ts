import {body} from 'express-validator'

const validations = [
    body('password').exists().withMessage('Password is required'),
    body('email').exists().withMessage('Email is required'),
    body('email').if(body('email').exists()).isEmail().withMessage('Invalid Email Format'),
    body('name').exists().withMessage('Name is required'),
    body('name').if(body('name').exists()).isLength({min:3}).withMessage('Name should have 3 letters at least'),
];

export default validations;