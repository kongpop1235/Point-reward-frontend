# Stage 1: Build the application
FROM node:18-alpine AS build

# กำหนดโฟลเดอร์ทำงาน
WORKDIR /app

# ✅ คัดลอกไฟล์ที่จำเป็นก่อน
COPY package.json ./
COPY package-lock.json ./

# ✅ ติดตั้ง dependencies
RUN npm install

# ✅ คัดลอกโค้ดทั้งหมดไปที่ /app
COPY . .

# ✅ รันคำสั่งบิลด์
RUN npm run build 

# Stage 2: Copy production build
FROM node:18-alpine

# กำหนด environment เป็น production
ENV NODE_ENV=production

# กำหนดโฟลเดอร์ทำงาน
WORKDIR /app

# ✅ คัดลอกเฉพาะไฟล์ที่จำเป็นจาก stage แรก
COPY --from=build /app/.output .output
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/package.json package.json

# ✅ ย้ายคำสั่ง COPY nuxt.config.ts ไปไว้หลัง COPY . เพื่อให้แน่ใจว่าไฟล์จะไม่ถูกละเว้น
COPY nuxt.config.ts nuxt.config.ts

# ✅ คัดลอกโฟลเดอร์ i18n/locales ทั้งหมดที่จำเป็นสำหรับ i18n
COPY --from=build /app/i18n/locales/ i18n/locales/

# เปิดพอร์ต 3000
EXPOSE 3000 

# ✅ รันเซิร์ฟเวอร์โดยตรงจาก .output โดยใช้ node
CMD ["node", ".output/server/index.mjs"]
