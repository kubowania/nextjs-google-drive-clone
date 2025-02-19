import { v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,

})

const handler = async (req, res) => {
    const url = req.url.split("?")
    const searchTerm = url[1]
    const data = await cloudinary.search.expression(searchTerm).execute()
    res.status(200).json(data.resources)
}

export default handler