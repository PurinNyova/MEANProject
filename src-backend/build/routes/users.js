"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const mockUsers = [
    { name: "purin", email: "Purinnyova@purinnova.online" },
    { name: "fiona", email: "fionasherleen2005@outlook.com" }
];
const idVar = (request, response, next) => {
    if (request.params.id) {
        next();
    }
    else {
        response.status(400).json({ error: "ID parameter is missing" });
    }
};
router.get("/id/:id", idVar, (request, response) => {
    const id = parseInt(request.params.id);
    response.json({
        response: `Welcome anonymous, your requested id is ${id}`, ...mockUsers[id]
    });
});
router.get("/", (request, response) => {
    response.json({
        response: `Welcome anonymous`, data: mockUsers
    });
});
router.post("/", (request, response) => {
    const { name, email } = request.body;
    if (!name || !email) {
        response.status(400).json({ response: "Invalid Body" });
    }
    if (mockUsers.find((user) => { return user.name === name; })) {
        response.status(401).json({ response: "User already exist" });
    }
    mockUsers.push({ name: name, email: email });
    response.status(201).json({ response: `${name} ${email}` });
});
exports.default = router;
