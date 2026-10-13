import User from '../models/user.model.js'

const getprofile = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if(!user){
        return res.status(404).json({message:"user not found"})}

    res.status(200).json({message: 'profile created successfully', user})

    } catch (error) {
        res.status(500).json({
        message: 'server error'
    })}}


const updateprofile = async (req,res) => {
    try {
        const {name,phone,address,profileImage} = req.body
        const user = await User.findById(req.userId)
        if(!user)
        return res.status(404).json({message : "user not found"})

         if (name !== undefined) user.name = name;
         if (phone !== undefined) user.phone = phone;
         if (address !== undefined) user.address = address;
         if (profileImage !== undefined) user.profileImage = profileImage;

         await user.save()
         
        res.status(200).json({
        message:"profile update successfully",
        user:{
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profileImage: user.profileImage   
        }})
 
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}

export {getprofile,updateprofile}