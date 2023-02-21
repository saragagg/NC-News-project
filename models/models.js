const db = require('../db/connection')

function fetchTopics() {
    return db.query(`
    SELECT * FROM topics
    `).then(({rows}) => {
        return rows;
    })
}

function fetchArticles() {
    return db.query(`
    SELECT 
    articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, 
    COUNT(comments.article_id) AS comment_count 
    FROM articles
    LEFT JOIN comments
    ON articles.article_id=comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
    `).then(({rows}) => {
       return rows
    })
}

function fetchArticleById(article_id) {
    return db.query(`
    SELECT * FROM articles
    WHERE article_id = $1`, [article_id]).then((result) => {
        const {rowCount, rows} = result; 

        if(rowCount === 0) {
           return Promise.reject("article_id not found");
        }
        return rows[0];
    })
}

function fetchCommentsByArticleId(article_id) {
    return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;
    `, [article_id]).then(({rows, rowCount}) => {
        return rows;
    }) 
}

// SELECT * FROM comments WHERE article_id=2

module.exports = { fetchTopics, fetchArticles, fetchArticleById, fetchCommentsByArticleId }
