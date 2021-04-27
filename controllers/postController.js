import Post from "../models/Post";
import User from "../models/User";

export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send("Post Not Found.");
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).send("Plese provide all field.");
    }

    // create post
    const post = await Post.create({ title, content });

    //return post
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).send("Post Not Found.");
    }
    const post = await Post.findByIdAndUpdate(postId, req.body, { new: true });
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).send("Post Not Found.");
    }
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted Sucessfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
