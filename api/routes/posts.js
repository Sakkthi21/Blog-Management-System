const router = require('express').Router()
const Post = require('./../models/Post.js')

router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    return res.status(200).json(savedPost)
  } catch (err) {
    if (err.keyPattern.title === 1) {
      return res.status(403).json({message: 'The Title already exist'})
    }
    return res.status(500).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {new: true},
        )
        res.status(200).json(updatedPost)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json({message: 'You can update only your post!'})
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        const deletePost = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json('Post Successfully Deleted!')
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json({message: 'You can delete only your post!'})
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(400).json({message: 'Post Not Found'})
    }
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/', async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat

  try {
    let posts

    if (username) {
      posts = await Post.find({username})
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      })
    } else {
      posts = await Post.find()
    }
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
