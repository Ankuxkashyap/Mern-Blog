import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';



export const registerUser = async (req, res) => {
    try {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
          
        const {fullName,email,password} = req.body;
        // console.log({email,fullName,password})

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if(fullName.length <3){
            return res.status(403).json({message: 'fullname length lass then 3'})
        }

        if( passwordRegex.test(password) === false){
            return res.status(400).json({ message: 'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.' });
        }
        if( emailRegex.test(email) === false){
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const existingUser = await User.findOne({ 'personalInfo.email': email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const username = email.split('@')[0] + Math.floor(Math.random()*1000);

        const newUser = new User({
            personalInfo: {
                fullName: fullName,
                email,
                username,
                password: hashedPassword,
            }
        });

        
        const savedUser = await newUser.save();

        const payload = {
            id: savedUser._id,
            profile_img: savedUser.personalInfo.profile_img,
            username:savedUser.personalInfo.username,
            name: savedUser.personalInfo.fullName
        };

        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ message: 'User registered successfully', token,user:payload });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ 'personalInfo.email': email });


        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.personalInfo.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

    
        const payload = {
            id: user._id,
            profile_img: user.personalInfo.profile_img,
            username:user.personalInfo.username,
            name: user.personalInfo.fullName
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: payload
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

export const getUserProfile = async(req,res) =>{

     try{
        const userId = req.user._id; 
        const user = await User.findById(userId).select('-personalInfo.password'); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });

     }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
}
