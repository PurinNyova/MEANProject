import { Request, Response, Router } from "express";
import fs from 'fs'
import UserSchema from "../models/user.model";
import multer from 'multer'
import path from "path";

const router = Router();

interface UserInput {
    name: string;
    npm: number;
    kelas: string;
    jurusan: string;
    lokasiKampus: string;
    tempatTanggalLahir: string;
    kelamin: string;
    alamat: string;
    noHP: number;
    email: string;
    posisi: string;
    lastIPK: number;
    files?: File[];
  }


const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    const dir = path.join('uploads', request.body.npm);

    // Check if the directory exists, if not create it
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    req.body.files = 'uploads/'+req.body.npm
    cb(null, file.originalname);
  }
});
  
const upload = multer({ storage: storage })

router.get("/", async (request: Request, response: Response) => {
    try {
        const queriedUser = await UserSchema.find({});
        console.log("Main dbRoute Call")
        response.status(200).json({success: true, ...queriedUser})
    } catch (error: any) {
        console.log("Error detected in dbtest get root", error.message)
        response.status(500).json({success: false, message:"Internal server error"})
    }
    
})


router.get("/:param", async (request: Request, response: Response) => {
    const paramField = request.params.param;
    const queryValue = request.query.value

    if (!queryValue) {
        response.status(400).json({ success: false, message: "Query value is required" });
        return
    }

    try {
        const query: any = {};
        // Regex for da search thingy below
        query[paramField] = { $regex: new RegExp(queryValue as string, 'i') }; 
        const queriedUser = await UserSchema.find(query);
        console.log(queriedUser);
        response.status(200).json({ success: true, ...queriedUser });
    } catch (error: any) {
        console.log("Error detected in dbtest get param", error.message);
        response.status(500).json({ success: false, message: "Internal server error" });
    }
})

router.post("/", upload.array('files'), async (request: Request, response: Response) => {
    const user: UserInput= request.body

    if (!user.name || !user.email || !user.npm || !user.kelas || !user.jurusan || !user.lokasiKampus || !user.tempatTanggalLahir || !user.kelamin || !user.alamat || !user.noHP || !user.posisi || !user.lastIPK) {
        response.status(400).json({ success: false, message: 'Invalid Body: Is every required field populated?' });
        return
    }

    const newUser = new UserSchema(user)
    if (newUser.files === '') {newUser.files = "no documents"}

    try {
        await newUser.save()
        response.status(201).json({success: true, data:user})
    } catch (error: any) {
        console.error("Error in adding new user", error)
        if (error.name === 'MongoServerError' && error.code === 11000) {
            response.status(400).send({ success: false, message: 'User already exists!' });
            return
        }
        response.status(500).json({success: false, message: "there has been an error in adding new user"})
    }


})

router.post("/del/:npm", async (request: Request, response: Response) => {
    console.log(request.session.user)
    if (request.session.user) {
        const { npm } = request.params

        if (!npm) {
            response.status(400).json({ success: false, message: "npm value is required" });
            return
        }

        try {
            const queriedUser = await UserSchema.deleteOne({npm: npm});
            console.log(queriedUser);
            response.status(200).json({ success: true, ...queriedUser });
        } catch (error: any) {
            console.log("Error detected in dbtest get param", error.message);
            response.status(500).json({ success: false, message: "Internal server error" });
        }

      } else {
        response.status(400).json({type: 'session', success: false})
      }
})

export default router;