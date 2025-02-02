import { Request, Response, Router } from "express";

const router = Router();

router.get("/social", (request: Request, response: Response) => {
    response.json({
        response: `Welcome anonymous` 
    })
})

export default router;