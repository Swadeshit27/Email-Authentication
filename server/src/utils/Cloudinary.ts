import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

export const uploadOnCloudinary = async (localFilePath: string) => {
    try {
        if (!localFilePath) return null;
        console.log(localFilePath);

        const response = await cloudinary.uploader.upload(localFilePath, { timeout: 120000 });
        console.log(response);
        return response;
    } catch (error) { 
        console.log(error);
        return null;
    } finally {
        fs.unlinkSync(localFilePath)
    }
}

export const deleteOnCloudinary = async (public_id: string, resource_type = "image") => {
    console.log(public_id);
    try {
        if (!public_id) return null;
        await cloudinary.uploader.destroy(public_id, {
            resource_type: `${resource_type}`
        })
    } catch (error) {
        console.log("delete on cloudinary failed", error);
        return error
    }
}

