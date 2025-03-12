FROM node:18-alpine as build

WORKDIR /app

COPY package.json . 

RUN npm install

COPY . .

RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/build/favicon.ico /usr/share/nginx/html/favicon.ico
COPY --from=build /app/build/smooch_preview.jpg /usr/share/nginx/html/smooch_preview.jpg

# Add custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
