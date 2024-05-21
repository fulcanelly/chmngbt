# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

#Install dependencies 
COPY . .
RUN npm install

RUN yarn upgrade && yarn install

# Bundle app source
COPY . .


# Define the command to run your app
CMD ["node", "main.js"]