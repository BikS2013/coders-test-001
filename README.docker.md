# Docker Setup for React Dashboard

This document explains how to use Docker to build and run the React dashboard application.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine (optional, but recommended)

## Building and Running with Docker

### Using Docker Compose (Recommended)

1. Build and start the container:

```bash
docker-compose up -d
```

2. Access the application at http://localhost:8080

3. Stop the container:

```bash
docker-compose down
```

### Using Docker Directly

1. Build the Docker image:

```bash
docker build -t react-dashboard .
```

2. Run the container:

```bash
docker run -p 8080:80 -d --name react-dashboard-container react-dashboard
```

3. Access the application at http://localhost:8080

4. Stop the container:

```bash
docker stop react-dashboard-container
docker rm react-dashboard-container
```

## Configuration

### Environment Variables

You can configure environment variables in the `docker-compose.yml` file:

```yaml
environment:
  - NODE_ENV=production
  - API_URL=https://api.example.com
```

### Nginx Configuration

The application uses Nginx to serve the static files. The default configuration is in `nginx.conf`. You can modify this file to customize:

- Compression settings
- Cache control
- Security headers
- URL routing

To use the custom Nginx configuration, uncomment this line in the Dockerfile:

```dockerfile
# COPY nginx.conf /etc/nginx/conf.d/default.conf
```

## Production Deployment

For production deployment, consider:

1. Using a specific version tag for the Node.js and Nginx base images
2. Setting up proper SSL/TLS certificates
3. Configuring a reverse proxy like Traefik or Nginx for handling multiple services
4. Setting up health checks and monitoring

## Troubleshooting

### Container not starting

Check the logs:

```bash
docker logs react-dashboard-container
```

### Application not accessible

Verify the container is running:

```bash
docker ps
```

Check if port 8080 is already in use on your host machine:

```bash
netstat -tuln | grep 8080
```
