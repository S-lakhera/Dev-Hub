const ImageKit = require("imagekit");
const multer = require("multer");
require("dotenv").config()

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToImageKit = async (fileBuffer, fileName) => {
    try {
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: fileName,
            folder: "DevHub"
        });
        return response.url;
    } catch (error) {
        throw new Error("Image upload failed");
    }
};

module.exports = { upload, uploadToImageKit };