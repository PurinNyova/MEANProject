import { Request, Response, Router } from "express";

const router = Router();

router.get("/:social", (request: Request, response: Response) => {
    const social: string = request.params.social;
    response.json({
        response: `Welcome anonymous, your social is ${social}` 
    })
})

export default router;