import { Request, Response, Router } from "express";

const router = Router();

router.get("/portfolio", (request: Request, response: Response) => {
    response.json({
        response: `Welcome anonymous` 
    })
})

export default router;