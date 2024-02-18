export const createPostquery = `
    INSERT INTO posts (name, description, user_id, image, username, email)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;
export const getPostsQuery = "SELECT * FROM posts";
export const getPostsbyUserIdQuery = "SELECT * FROM posts WHERE user_id = $1";
export const getPostsbyIdQuery = "SELECT * FROM posts WHERE id = $1";