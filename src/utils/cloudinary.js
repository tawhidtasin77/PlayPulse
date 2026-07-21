import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


// console.log("cloud_name: ", process.env.CLOUDINARY_CLOUD_NAME)
// console.log("api_key: ", process.env.CLOUDINARY_API_KEY)
// console.log("api_secret: ", process.env.CLOUDINARY_API_SECRET)

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload the file on cloudinary

        // console.log("Uploading:", localFilePath);
        // console.log("Exists:", fs.existsSync(localFilePath));

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file upload successful
        console.log("file is uploaded on cloudinary.", response.url)
        fs.unlinkSync(localFilePath);
        return response;
    }
    // catch (error) {
    //     console.log("Cloudinary error: ", error);

    //     // fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got fail.
    //     // return null;
    //     if (localFilePath && fs.existsSync(localFilePath)) {
    //         fs.unlinkSync(localFilePath);
    //     }

    //     return null;
    // }
    catch (error) {
        console.log("========== CLOUDINARY ERROR ==========");
        console.log(error);
        console.log("Error message:", error.message);
        console.log("======================================");

        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
}

export { uploadOnCloudinary }