const { Post, Users } = require('../models');

module.exports = {
  // Get all 
  async getPost(req, res) {
    try {
      const post = await Post.find()
      .populate('post');
      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a post
  async getSinglePost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.postId })
      .populate('post');

      if (!post) {
        return res.status(404).json({ message: 'No post with that ID' });
      }

      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a post
  async createPost(req, res) {
    try {
      const post = await Post.create(req.body);
      res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a post
  async deletePost(req, res) {
    try {
      const post = await post.findOneAndDelete({ _id: req.params.postId });

      if (!post) {
        return res.status(404).json({ message: 'No post with that ID' });
      }

      await Post.deleteMany({ _id: { $in: post.user } });
      res.json({ message: 'Posts and User deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a post
  async updatePost(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!post) {
        return res.status(404).json({ message: 'No post with this id!' });
      }

      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
