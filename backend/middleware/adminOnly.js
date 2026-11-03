import User from '../models/user.model.js'

const adminOnly = async (req,res,next) => {
    try {
        const user = await User.findById(req.userId)
        .select("role")

        if(!user || user.role !== "admin"){
            return res.status(403).json({
                success: false,
                message: "Access denied. admin only",
            })
        }

        next()
    } catch (error) {
        console.error("admin middleware error:",error)
        return res.status(500).json({
            success:false,
            message: "admin authorization failed",
        })
    }
}
 export default adminOnly