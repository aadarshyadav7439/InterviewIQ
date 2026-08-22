import Post from "../models/Post.js";

//getting all the posts 
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name")
      .populate("comments.userId", "name")
      .sort({ createdAt: -1 });

    const formattedPosts = posts.map((post) => {
      const postObject = post.toObject();

      return {
        ...postObject,
        likedByCurrentUser: post.likes.some(
          (like) => like.toString() === req.userId.toString(),
        ),
      };
    });

    return res.status(200).json({
      posts: formattedPosts,
    });
  } catch (error) {
    console.error("GET COMMUNITY POSTS ERROR:", error);

    return res.status(500).json({
      message: error.message || "Failed to get posts",
    });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title?.trim() || !content?.trim()){
      return res.status(400).json({message: "Title and content are required"});
    }

    const post = await Post.create({
      userId: req.userId,
      title: title.trim(),
      content: content.trim(),
    });

    const populatedPost = await Post.findById(post._id).populate("userId","name");

    return res.status(201).json({
      message: "Post created successfully",
      post: populatedPost,
    });

  } catch (error){
    console.error("CREATE POST ERROR:", error);
    return res.status(500).json({message: error.message || "Failed to create post"});
  }
};

// like or unlike a post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({message: "Post not found"});
    }

    const userId = req.userId.toString();

    const alreadyLiked = post.likes.some(
      (like) => like.toString() === userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter((like) => like.toString() !== userId);
    } else{
      post.likes.push(req.userId);
    }
    await post.save();

    return res.status(200).json({
      message: alreadyLiked
        ? "Post unliked successfully"
        : "Post liked successfully",
      liked: !alreadyLiked,
      likesCount: post.likes.length,
    });

  } catch (error) {
    console.error("TOGGLE LIKE ERROR:", error);
    return res.status(500).json({message: error.message || "Failed to update like"});
    }
};

// Add a comment
export const addComment = async (req, res) => {
  try{
    const { content } = req.body;
    if (!content?.trim()) {
      return res.status(400).json({message: "Comment cannot be empty"});
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({message: "Post not found"});
    }

    post.comments.push({
      userId: req.userId,
      content: content.trim(),
    });

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("userId", "name")
      .populate("comments.userId", "name");

    return res.status(201).json({message: "Comment added successfully",post: updatedPost});

  } catch (error) {
    console.error("ADD COMMENT ERROR:", error);
    return res.status(500).json({message: error.message || "Failed to add comment",});
  }
};