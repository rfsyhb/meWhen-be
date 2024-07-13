# meWhen Backend

## Deskripsi
`meWhen-be` adalah backend untuk aplikasi timer simpel yang bernama meWhen yang memungkinkan pengguna untuk autentikasi untuk dapat mengelola to-dos mereka. Backend ini dibangun menggunakan Node.js framework Hapi.js dan menyediakan API untuk registrasi pengguna, login, dan manajemen to-dos.

## Instalasi
1. Clone repository ini.
    ```bash
    git clone https://github.com/rfsyhb/meWhen-be.git
    ```
2. Masuk ke direktori proyek.
    ```bash
    cd meWhen-backend
    ```
3. Install dependencies.
    ```bash
    npm install
    ```
4. Buat file `.env` di root direktori proyek dan tambahkan environment variable berikut:
    ```
    SECRET_KEY=your-secret-key
    HOST=localhost
    PORT=3000
    ```

## Menjalankan Server
Untuk menjalankan server, gunakan perintah berikut:
```bash
npm run dev
```
Server akan berjalan di `http://localhost:3000`.

## API Endpoints

### User Routes
| Method | Endpoint        | Deskripsi                           | Middleware  |
| ------ | --------------- | ----------------------------------- | ----------- |
| GET    | /users          | Mendapatkan daftar semua pengguna   | None        |
| GET    | /users/me       | Mendapatkan profil pengguna sendiri | verifyToken |
| POST   | /users/register | Mendaftarkan pengguna baru          | None        |
| POST   | /users/login    | Login pengguna                      | None        |

### Todo Routes
| Method | Endpoint           | Deskripsi                         | Middleware  |
| ------ | ------------------ | --------------------------------- | ----------- |
| GET    | /todos             | Mendapatkan semua todo milik user | verifyToken |
| POST   | /todos/create      | Membuat todo baru                 | verifyToken |
| PUT    | /todos/update/{id} | Mengupdate todo berdasarkan id    | verifyToken |
| DELETE | /todos/delete/{id} | Menghapus todo berdasarkan id     | verifyToken |