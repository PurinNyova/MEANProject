"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/portfolio", (request, response) => {
    response.json({
        response: `Welcome anonymous`
    });
});
exports.default = router;
