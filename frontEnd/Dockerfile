FROM node:13.12.0

# set working directory
WORKDIR /app
EXPOSE 3000
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install typescript

# add app
COPY . ./

# start app
CMD ["npm", "start"]