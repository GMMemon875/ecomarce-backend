import database from "../database/db";

export async function createUserTable() {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFault gen_random_uuid() PRIMARY KEY,
        name VARCHAR(100) NOT NULL CHEACK (char_lenght(name) >= 3),
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL (char_lenght(password) >= 8),
        role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        avatar JSONB DEFAULT NULL
        reset_password_token TEXT DEFAULT NULL,
        reset_password_expires TIMESTAMP DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
    `;

    await database.query(query);
  } catch (error) {
    console.error("❌ Failed To Create Products Table.", error);
    process.exit(1);
  }
}
