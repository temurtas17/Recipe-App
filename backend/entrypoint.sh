#!/bin/sh

# Veritabanı konteynerinin hazır olup olmadığını kontrol et
until nc -z -v -w30 db 5432
do
  echo "Waiting for database connection..."
  sleep 1
done

# Prisma Client'i oluştur ve veritabanı şemasını güncelle
npx prisma generate
npx prisma db push

# Uygulamayı başlat
npm start