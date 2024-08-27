FROM node:14
WORKDIR /react-to-do/frontend
COPY package.json package-lock.json ./
RUN npm install 
COPY . ./
EXPOSE 3000

CMD ["npm", "start"]


# FROM node:16 AS build
# WORKDIR /react-to-do/frontend
# COPY package.json package-lock.json ./
# RUN npm install 
# COPY . ./
# RUN npm run build
# FROM nginx:stable-alpine
# COPY --from=build /react-to-do/frontend/build /usr/share/nginx/html
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]