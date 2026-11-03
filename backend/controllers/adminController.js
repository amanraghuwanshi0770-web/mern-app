import User from "../models/user.model.js"
import Product from "../models/product.modle.js"
import Order from "../models/order.modle.js"


export const getAdminDashboard = async(req,res) => {
    try {
        const totalUsers = await User.countDocuments()
        const totalProducts = await Product.countDocuments()
        const totalOrders = await Order.countDocuments()

        const revenueResult = await Order.aggregate([
            {
                $match:{paymentStatus:"Paid"},
            },
            {
                $group:{_id:null,total :{$sum : "$totalAmount"}},
            },
        ])

        const totalRevenue = revenueResult[0]?.total || 0

        const sixMonthAgo = new Date()
        sixMonthAgo.setDate(1)
        sixMonthAgo.setMonth(sixMonthAgo.getMonth() -5 )
        sixMonthAgo.setHours(0,0,0,0)

        const selesResult = await Order.aggregate([
          {
            $match:{paymentStatus: "PAID",
              createdAt:{$gte:sixMonthAgo},
            },
          },
          {
            $group:{
              _id:{
                year:{$year: "$createdAt"},
                month:{$month: "$createdAt"},
              },
              revenue:{$sum : "$totalAmount"}
            },
          },
          {
            $sort:{
              "_id.year":1,
               "_id.month":1,
            },
          },
        ])

        const monthLySales = []
        for(let i=0; i<6; i++){
          const date = new Date(sixMonthAgo)
          date.setMonth(date.getMonth() + 1)

          const year = date.getFullYear()
          const month = date.getMonth() + 1

          const fonud = selesResult.find((item)=>
            item._id.year === year && item._id.month === month
          )

          monthLySales.push({
            month : date.toLocaleString("en-US",{month:"short"})
          })
        }

        const topSellingProducts = await Order.aggregate([
          {
            $unwind:"$items",
          },
          {
            $match:{
              status:{$ne: "Cancelled"},
            },
          },
          {
            $group:{
              _id:"$items.product",
              totalSold:{
                $sum:"items.quantity",
            },
            totalRevenue: {
            $sum: {
              $multiply: ["$items.price", "$items.quantity"],
            },
          },
         },
        },
        {
          $sort:{
            totalSold:-1,
          },
        },
        {
          $limit:5,
        },
        {
          $lookup:{
            from:Product.collection.name,
            localField:"_id",
            foreignField:"_id",
            as:"product"
          },
        },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          name: "$product.name",
          totalSold: 1,
          totalRevenue: 1,
        },
      },
    ])

        const recentOrders = await Order.find()
        .populate("user", "name email")
        .populate("items.product","name image")
        .sort({createdAt : -1})
        .limit(5)

        return res.status(200).json({
            success:true,
            stats:{
                totalUsers,totalProducts,totalOrders,totalRevenue,
            },
            monthLySales,topSellingProducts,recentOrders,
        })
    } catch (error) {
        console.error("admin dashboard error:",error)
        return res.status(500).json({
            success:false,
            message:"failed to fatch admin dashboard",
        })
    }
}



export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select(
        "-password -signupOtpHash -signupOtpExpires -resetOtpHash -resetOtpExpires -resetOtpVerified"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name image")
      .sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    })
  } catch (error) {
    console.error("Get all orders error:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    })
  }
}