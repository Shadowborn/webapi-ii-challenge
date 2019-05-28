const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
};

function find(query) {
    const { page = 1, pagesize = 2, sortby = 'id', sortdir = 'asc' } = query;
    const offset = pagesize * (page - 1);
  
    let rows = db('posts')
      .orderBy(sortby, sortdir)
      .limit(pagesize)
      .offset(offset);
  
    return rows;
  }

function findById(id) {
  return db('posts').where({ id: Number(id) });
}

function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db('posts')
    .where('id', Number(id))
    .update(post);
}

function remove(id) {
  return db('posts')
    .where('id', Number(id))
    .del();
}

function findPostComments(postId) {
  return db('contents')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('post_id', postId);
}

function findCommentById(id) {
  return db('contents')
    .join('posts', 'posts.id', 'post_id')
    .select('contents.*', 'title as post')
    .where('contents.id', id);
}

function insertComment(comment) {
  return db('contents').insert(comment).then(ids => ({ id: ids[0] }));
}