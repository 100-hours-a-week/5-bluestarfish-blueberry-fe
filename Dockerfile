FROM node:14
WORKDIR /react-to-do/frontend
COPY package.json package-lock.json ./
RUN npm install 
COPY . ./
EXPOSE 3000

CMD ["npm", "start"]