import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (res, req) => {

    // get user details from frontend
    // validation - not empty
    // check if user already exists - check with username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // check for user creation 
    // remove password and refresh token field from response
    // return response


    // get user details from frontend
    const {fullName, email,username, password} = req.body
    console.log("email:",email);

    // validation - not empty
    // if(fullName === ""){
    //     throw new ApiError(400, "Full Name is required")
        
    // }
    if(
        [fullname,email,username,password].some((field) => field ?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exists - check with username, email

    const existedUser = User.findOne({
        $or : [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exist")
    }

    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    // upload them to cloudinary, avatar

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // check for images, check for avatar
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    // create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // check for user creation &// remove password and refresh token field from response(select method)
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check is it a created user
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200,createdUser, "User register Successfully")
    )
    
})

export {registerUser}


