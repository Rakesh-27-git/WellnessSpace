import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.modal.js";


const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        if(!user) throw new ApiError(404, "User not found")
        
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({
            validateBeforeSave: false,
        })

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Failed to generate access and refresh token")
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) throw new ApiError(400, "Email and password are required")

    const existingUser = await User.findOne({email})
    if(existingUser) throw new ApiError(400, "User already exists")

    const user = await User.create({email, password})
    
    const createdUser = await User.findById(user._id).select("-password");
    if(!createdUser) throw new ApiError(500, "Something went wrong while registering the user")

    return res.status(201).json(new ApiResponse(201,{user: createdUser, accessToken, refreshToken}, "User registered successfully"))
}
)

