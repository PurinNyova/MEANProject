import { Request, Response, Router } from "express";
import documentSchema from "../models/file.model";
import UserSchema from "../models/user.model";

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
    lastIPK: string;
    Document?: string;
  }
  
router.get("/", async (request: Request, response: Response) => {
    try {
        const queriedUser = await UserSchema.find({});
        console.log(queriedUser)
        response.status(200).json({success: true, ...queriedUser})
    } catch (error: any) {
        console.log("Error detected in dbtest get root", error.message)
        response.status(500).json({success: false, message:"Internal server error"})
    }
    
})


router.get("/:test", (request: Request, response: Response) => {
    const testParam = request.params.test
    
    response.json({
        response: `Welcome anonymous. Test Param ${testParam}` 
    })
})

router.post("/", async (request: Request, response: Response) => {
    const user: UserInput= request.body

    if (!user.name || !user.email || !user.npm || !user.kelas || !user.jurusan || !user.lokasiKampus || !user.tempatTanggalLahir || !user.kelamin || !user.alamat || !user.noHP || !user.email || !user.posisi || !user.lastIPK) {
        response.status(400).json({ response: 'Invalid Body: Is every required field populated?' });
    }

    const newUser = new UserSchema(user)
    if (newUser.Document === undefined) {newUser.Document = "no documents"}

    try {
        await newUser.save();
        response.status(201).json({success: true, data:user})
    } catch (error: any) {
        console.error("Error in adding new user", error)
        response.status(500).json({success: false, message:"there has been an error in adding new user"})
    }


})

export default router;