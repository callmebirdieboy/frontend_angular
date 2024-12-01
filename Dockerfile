# Step 1: Build the Angular app
FROM node:18 AS build

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Build the Angular app in production mode
RUN npm run build --prod

# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built Angular app into the Nginx folder
COPY --from=build /app/dist/catalogo-peliculas /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
