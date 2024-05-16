
# Service Registration API

This project provides an API to register services by specifying a GitHub repository URL. The repository is expected to be a Node.js-based API (e.g., Express.js) listening on port 3000. Upon registration, a Docker container is spun up to clone the repository, install dependencies, and start the service.

## Prerequisites
* Node.js and npm installed
* Docker installed and running

## Setup

1. Clone the Repository

```bash
git clone https://github.com/kovoor/service-api.git
cd web-hosting-service
```

2. Install Dependencies

```bash
npm install
```

3. Pull the Node Docker Image

```bash
docker pull node:latest
```

4. Start the Express server:

``` bash
node server.js
```

The server will run on port 3000 by default.


## API Endpoint

| Endpoint  | Method |
|-----------|--------|
| /register | POST   |

**Request Body (EXAMPLE ONLY):**
```json
{
  "repoUrl": "https://github.com/your-username/your-express-repo"
}
```

**Response:** 

```json
{
  "serviceUrl": "http://<your-server-ip>:<assigned-port>"
}
```

**Error Response:**

```json
{
  "error": "GitHub repo URL is required"
}
```


## Example Usage

1. **Register a Service**

Use the following curl command to register a service:

``` bash
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"repoUrl": "https://github.com/your-username/your-express-repo"}'
```

2. **Successful Registration**

The response will include the serviceUrl where the registered service is accessible.

Example response:
    
```json
{
  "serviceUrl": "http://<your-server-ip>:10000"
}
```


## Troubleshooting

1. **Missing GitHub Repo URL**
If the repoUrl is missing, the API will return an error message. In which case try providing a proper Github repo url.

Example response:

```json
{
  "error": "GitHub repo URL is required"
}
```

2. **Docker Errors**

If there are issues with Docker, the API will return an appropriate error message.

Example response:

```json
{
  "error": "(HTTP code 404) no such container - No such image: node:latest "
}
```

If you encounter any issues, you can check the Docker container logs for more detailed error messages:

``` bash
docker logs <container_id>
```

Also ensure Docker daemon is running:

```bash
sudo systemctl status docker
```


## Scaling and Security

* **Security:** Implement authentication to ensure only authorized users can register services.
* **Resource Limits:** Set resource limits on Docker containers to prevent resource exhaustion.
* **Scaling:** Use Docker Swarm, Kubernetes, or another orchestration tool to handle scaling and orchestration.

## Notes

* The service name is generated uniquely for each registration.
* The port range 10000-11000 is used for mapping the services.
* The Docker container clones the GitHub repository, installs dependencies, and starts the service.
* The implementation follows REST API principles and provides clear endpoints for registering services and retrieving service URLs.

This implementation ensures all requirements are met.


## License

This project is licensed under the MIT License.
