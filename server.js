// index.js
const express = require('express');
const bodyParser = require('body-parser');
const Docker = require('dockerode');
const { v4: uuidv4 } = require('uuid');

const app = express();
const docker = new Docker();
const PORT_RANGE_START = 10000;
const PORT_RANGE_END = 11000;
let currentPort = PORT_RANGE_START;

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { repoUrl } = req.body; // Changed to repoUrl to match the cURL command
  if (!repoUrl) {
      return res.status(400).json({ error: 'GitHub repo URL is required' });
  }

  const port = currentPort++;
  if (currentPort > PORT_RANGE_END) currentPort = PORT_RANGE_START;

  const containerName = `service-${uuidv4()}`;
  try {
      const container = await docker.createContainer({
          Image: 'node:latest',
          name: containerName,
          ExposedPorts: {
              '3000/tcp': {}
          },
          HostConfig: {
              PortBindings: {
                  '3000/tcp': [{ HostPort: port.toString() }]
              }
          },
          Cmd: ['sh', '-c', `git clone ${repoUrl} app && cd app && npm install && npm start`]
      });

      await container.start();

      const serviceUrl = `http://your-server-ip:${port}`;
      res.json({ serviceUrl });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});