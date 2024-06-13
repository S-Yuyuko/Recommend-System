const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/genres', (req, res) => {
    const pythonProcess = spawn('python', ['Python/Genres.py']);

    let data = '';
    pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString();
    });

    pythonProcess.stderr.on('data', (error) => {
        console.error(`Error: ${error}`);
        if (!res.headersSent) {
            res.status(500).send(error.toString());
        }
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python script exited with code ${code}`);
            if (!res.headersSent) {
                res.status(500).send(`Python script exited with code ${code}`);
            }
        } else {
            try {
                const result = JSON.parse(data);
                res.json(result);
            } catch (err) {
                console.error('Failed to parse JSON', err);
                res.status(500).send('Failed to parse JSON');
            }
        }
    });
});

app.post('/movies', (req, res) => {
    const { genres, page, limit } = req.body;

    const pythonProcess = spawn('python', ['Python/Movies.py', JSON.stringify(genres), page, limit]);

    let data = '';
    pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString();
    });

    pythonProcess.stderr.on('data', (error) => {
        console.error(`Error: ${error}`);
        if (!res.headersSent) {
            res.status(500).send(error.toString());
        }
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python script exited with code ${code}`);
            if (!res.headersSent) {
                res.status(500).send(`Python script exited with code ${code}`);
            }
        } else {
            try {
                const result = JSON.parse(data);
                res.json(result);
            } catch (err) {
                console.error('Failed to parse JSON', err);
                res.status(500).send('Failed to parse JSON');
            }
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
