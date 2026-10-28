# Backend setup

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to your MongoDB connection string and replace `JWT_SECRET` with a long random secret. Set `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` for the first administrator. Keep `.env` private.
3. From this folder, install dependencies and create the initial admin:

   ```sh
   npm install
   npm run seed:admin
   ```

   If you change `ADMIN_PASSWORD` later and need to update the existing admin account, run `npm run seed:admin -- --reset-password`.

4. Start the API with `npm run dev`. It listens on port `5000` by default.
5. In another terminal, run the frontend from `../frontend` with `npm run dev`. The frontend uses `http://localhost:5000/api` by default; set `VITE_API_URL` in the frontend environment if the API is hosted elsewhere.

Admins create student login accounts from the admin dashboard. There is no public signup endpoint.
