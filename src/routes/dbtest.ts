import { Request, Response, Router } from "express";

const router = Router();

router.get("/:test", (request: Request, response: Response) => {
    const testParam = request.params.test
    response.json({
        response: `Welcome anonymous. Test Param ${testParam}` 
    })
})


router.post("/:test", (request: Request, response: Response) => {
    const testParam = request.params.test
    const {name, email} = request.body

    if (!name || !email) {
        response.status(400).json({response: 'Invalid Body'})
    }

    response.json({
        response: `Welcome anonymous. Test Param ${testParam} ${name} ${email}` 
    })
})

export default router;