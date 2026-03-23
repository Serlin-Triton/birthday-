# Use a lightweight NGINX image
FROM nginx:alpine

# Copy the static web files into the default NGINX HTML directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
