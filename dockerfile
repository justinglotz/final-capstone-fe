# Use the latest LTS version of Node.js
FROM node:24-alpine
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm ci
 
# Copy environment variables
COPY .env .env

# Copy the rest of your application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 3000

# Set hostname to 0.0.0.0 so it's accessible outside the container
ENV HOSTNAME=0.0.0.0
 
# Define the command to run your app
CMD ["npm", "run", "dev"]
