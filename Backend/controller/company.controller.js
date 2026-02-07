import { Company } from "../model/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    const userId = req.id;

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    const existingCompany = await Company.findOne({
      name: companyName,
      userId,
    });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "you cant't register same company",
      });
    }

    const company = await Company.create({
      name: companyName,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    console.log("Register Company Error:", error);
    if (error?.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    
    return res.status(200).json({
      success: true,
      companies: companies || [],
      message: companies.length > 0 
        ? "Companies fetched successfully" 
        : "No companies found",
    });
  } catch (error) {
    console.error("Get Company Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch companies",
      companies: [],
    });
  }
};

export const getComanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    if (!companyId) {
      return res.status(400).json({
        message: "Company ID is required",
        success: false,
      });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error("Get Company By ID Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid company ID format",
        success: false,
      });
    }

    return res.status(500).json({
      message: error.message || "Failed to fetch company",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;


    const companyId = req.params.id;

    if (!companyId) {
      return res.status(400).json({
        message: "Company ID is required",
        success: false,
      });
    }

    const updateData = { name, description, website, location };

    // Handle logo file upload if provided
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "company-logos",
      });
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Update Company Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid company ID format",
        success: false,
      });
    }

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: errors.join(", "),
        success: false,
      });
    }

    return res.status(500).json({
      message: error.message || "Failed to update company",
      success: false,
    });
  }
};
