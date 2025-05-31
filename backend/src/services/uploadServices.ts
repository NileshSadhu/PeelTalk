import { cloudinary } from "../utils/cloudinary";


export const uploadToCloudinary = async (fileBuffer: Buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_images" }, 
        (error, result) => {
            if (error) return reject(error);
            resolve(result);
        }
        );

        stream.end(fileBuffer);
    });
};
