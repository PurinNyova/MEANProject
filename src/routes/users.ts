import { Request, Response, Router } from "express";

const router = Router();

router.get("/:id", (request: Request, response: Response) => {
    const id = request.params.id;
    response.json({
        response: `Welcome anonymous, your id is ${id}` 
    })
})

export default router;