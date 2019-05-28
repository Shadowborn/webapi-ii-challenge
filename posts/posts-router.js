const Posts = require('../data/db.js'); // <<<<< updated path

const router = require('express').Router();

// middleware router.use(mw)

// for url beginning with /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'post not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the post',
    });
  }
});

router.post('/', async (req, res) => {
  const {title, contents} = req.body
  if (!title || !contents){
    res.status(400).json({
      message: 'Please provide title and contents for the post.',
    })
  }
  try {
    const post = await Posts.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Something wrong with server',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      
      res.status(200).json({ message: 'The post has been nuked' });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post',
    });
  }
});

// /api/posts/:id/messages
router.get('/:id/messages', (req, res) => {
  Posts.findpostMessages(req.params.id)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
  console.log(req.params)
  Posts.findPostComments(req.params.id)
      .then(comments => {
        res.status(200).json(comments);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

module.exports = router;
