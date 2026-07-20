import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOODINARY_CLOUD_NAME,
    api_key: process.env.CLOODINARY_API_KEY,
    api_secret: process.env.CLOODINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file upload successful
        console.log("file is uploaded on cloudinary.", response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got fail.
        return null;
    }
}

export {uploadOnCloudinary}