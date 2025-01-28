"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const socials_1 = __importDefault(require("./routes/socials"));
const dbtest_1 = __importDefault(require("./routes/dbtest"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3001;
var cors = require('cors');
app.use(express_1.default.json());
app.use(cors());
app.use("/api/users", users_1.default);
app.use("/about/", socials_1.default);
app.use("/api/db", dbtest_1.default);
// Serve HTML file
app.get('/', (req, res) => {
    res.status(200).json({ success: true });
});
app.listen(port, () => {
    (0, db_1.connectDB)();
    console.log(`Server is running at http://localhost:${port}`);
});
