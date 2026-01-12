const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require('cors');

const app = express();
app.use(cors())

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use("/ai", aiRoutes);

/** * ERROR HANDLER (Add this here!)
 * This catches the "Bad control character" error from express.json()
 * and sends a JSON response instead of the HTML error page.
 */
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            error: "Invalid JSON format", 
            message: "Please remove physical line breaks (Enters) from your JSON string and use \\n instead." 
        });
    }
    next();
});

module.exports = app;