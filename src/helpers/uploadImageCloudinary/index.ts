import * as cloudinary from 'cloudinary';
import dotenv from 'dotenv';
require('dotenv').config();

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.v2.config({
    cloud_name,
    api_key,
    api_secret,
});

const uploadImage = async (image: string) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        // Upload the image
        //@ts-ignore
        const result: any = await cloudinary.uploader.upload(image, options); // Using 'any' to bypass TypeScript error
        const secureURL = result.secure_url;
        return secureURL;
    } catch (error: any) {
        throw error;
    }
};

export default uploadImage;