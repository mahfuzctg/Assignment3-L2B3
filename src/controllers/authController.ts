import bcrypt from "bcrypt";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const { name, email, role, password, phone, address } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please use a different email address.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser: IUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
      phone,
      address,
    });

    // Save the user to the database
    await newUser.save();

    // Prepare and send response
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        address: newUser.address,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
