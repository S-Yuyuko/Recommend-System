const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/genres', (req, res) => {
    const pythonProcess = spawn('python', [path.join(__dirname, 'Python', 'Genres.py')], {
        cwd: path.join(__dirname, 'Python')
    });

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

    const pythonProcess = spawn('python', [path.join(__dirname, 'Python', 'Movies.py'), JSON.stringify(genres), page, limit], {
        cwd: path.join(__dirname, 'Python')
    });

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

app.post('/recommend', (req, res) => {
    const { likedMovies } = req.body;

    if (!likedMovies || likedMovies.length === 0) {
        return res.status(400).json({ error: 'No liked movies provided' });
    }

    const pythonProcess = spawn('python', [path.join(__dirname, 'Python', 'Recommend.py')], {
        cwd: path.join(__dirname, 'Python')
    });

    pythonProcess.stdin.write(JSON.stringify(likedMovies));
    pythonProcess.stdin.end();

    let data = '';
    pythonProcess.stdout.on('data', (chunk) => {
        data += chunk.toString();
    });

    pythonProcess.stderr.on('data', (error) => {
        console.error(`stderr: ${error}`);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Error processing recommendations' });
        }
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.log(`child process exited with code ${code}`);
            if (!res.headersSent) {
                res.status(500).json({ error: `Python script exited with code ${code}` });
            }
        } else {
            try {
                const recommendations = JSON.parse(data);
                res.json(recommendations);
            } catch (e) {
                console.error('Error parsing Python script output:', e);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Error processing recommendations' });
                }
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
