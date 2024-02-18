export const createUserQuery = "INSERT INTO users (username, email, password, phoneNumber) VALUES ($1, $2, $3, $4) RETURNING *"
export const loginUser = "SELECT * FROM users WHERE email = $1";