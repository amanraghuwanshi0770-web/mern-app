import Product from "../models/product.modle.js";

 const createproduct = async (req, res) => {
  try {
    const {
      name,price,
      category,description,
      image,stock,} = req.body;

    const product = await Product.create({
      name,price,
      category,description,
      image,stock,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({message: "Products fetched successfully",
      products});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message});
  }}


const updateProducts = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,{
        new: true, runValidators: true,
      })

    if (!product) {
      return res.status(404).json({ message: "Product not found"})
    }

    return res.status(200).json({message: "Product updated successfully",
      product})

  } catch (error) {
    return res.status(500).json({message: "Failed to update product",error: error.message});
  }}


  const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found"})
    }
    return res.status(200).json({message: "Product delete successfully",
      product})
  } catch (error) {
    return res.status(500).json({message: "Failed to detete product",error: error.message});
  }}

export {getProducts,createproduct,updateProducts,deleteProduct}

