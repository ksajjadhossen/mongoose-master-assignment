import { NextFunction, Request, Response } from "express";
import { productServices } from "./product.services";

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData = req.body;
    const data = await productServices.addProductOnDB(productData);
    res.send({
      success: true,
      message: "Product created successfully!",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.query.searchTerm;
    if (name) {
      const data = await productServices.searchProductsFromDB(name as string);
      return res.send({
        success: true,
        message: `Products matching search term '${name}' fetched successfully`,
        data: data,
      });
    }
    const data = await productServices.fetchAllProductsFromDB();
    res.send({
      success: true,
      message: "Products fetched successfully!",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const getAProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const data = await productServices.fetchAProductFromDB(id);
    res.send({
      success: true,
      message: "Product fetched successfully!",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const updateAProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const productData = req.body;
    const data = await productServices.updateAProductFromDB(id, productData);
    res.send({
      success: true,
      message: "Product updated successfully!",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = await productServices.deleteAProductFromDB(id);
    res.send({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
export const productsController = {
  addProduct,
  getAllProduct,
  getAProduct,
  updateAProduct,
  deleteAProduct,
};
