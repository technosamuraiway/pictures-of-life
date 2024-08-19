FROM node:20.11-alpine as dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:20.11-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /node_modules ./node_modules
RUN npm run build:production

FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /next.config.js ./
COPY --from=builder /public ./public
COPY --from=builder /.next ./.next
COPY --from=builder /node_modules ./node_modules
COPY --from=builder /package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
