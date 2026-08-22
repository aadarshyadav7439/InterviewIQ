import { useEffect, useState } from "react";
import { Heart, MessageCircle, Plus, Send, Users, X } from "lucide-react";
import {
  addComment,
  createPost,
  getPosts,
  toggleLike,
} from "../services/communityServices.js";

function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);

  const [commentInputs, setCommentInputs] = useState({});
  const [commentLoading, setCommentLoading] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPosts();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("GET COMMUNITY POSTS ERROR:", err);

      setError(
        err.response?.data?.message || "Unable to load community posts.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    try {
      setCreating(true);
      setError("");

      const data = await createPost({
        title: title.trim(),
        content: content.trim(),
      });

      setPosts((currentPosts) => [data.post, ...currentPosts]);

      setTitle("");
      setContent("");
      setShowCreatePost(false);
    } catch (err) {
      console.error("CREATE POST ERROR:", err);

      setError(err.response?.data?.message || "Unable to create your post.");
    } finally {
      setCreating(false);
    }
  };

  const handleToggleLike = async (postId) => {
    try {
      const data = await toggleLike(postId);

      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post._id !== postId) return post;

          return {
            ...post,
            likedByCurrentUser: data.liked,
            likes: Array(data.likesCount).fill("liked"),
          };
        }),
      );
    } catch (err) {
      console.error("TOGGLE LIKE ERROR:", err);
    }
  };

  const handleAddComment = async (event, postId) => {
    event.preventDefault();

    const comment = commentInputs[postId]?.trim();

    if (!comment) return;

    try {
      setCommentLoading((current) => ({
        ...current,
        [postId]: true,
      }));

      const data = await addComment(postId, comment);

      setPosts((currentPosts) =>
        currentPosts.map((post) => (post._id === postId ? data.post : post)),
      );

      setCommentInputs((current) => ({
        ...current,
        [postId]: "",
      }));
    } catch (err) {
      console.error("ADD COMMENT ERROR:", err);
    } finally {
      setCommentLoading((current) => ({
        ...current,
        [postId]: false,
      }));
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-8 sm:py-10">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#013364]">
            Community
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Learn from other interview experiences.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Share your interview experiences, ask questions, and learn from
            other candidates preparing for their next opportunity.
          </p>
        </div>

        <Users size={28} className="hidden shrink-0 text-[#013364] sm:block" />
      </div>

      {/* CREATE POST */}
      <section className="mt-10 border-y border-gray-200 py-5">
        {!showCreatePost ? (
          <button
            onClick={() => setShowCreatePost(true)}
            className="flex w-full items-center gap-3 text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef4fa]">
              <Plus size={18} className="text-[#013364]" />
            </div>

            <span className="text-sm text-gray-500">
              Share an interview experience or ask the community...
            </span>
          </button>
        ) : (
          <form onSubmit={handleCreatePost}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                Create a post
              </h2>

              <button
                type="button"
                onClick={() => {
                  setShowCreatePost(false);
                  setTitle("");
                  setContent("");
                }}
                className="text-gray-400 transition hover:text-gray-700"
              >
                <X size={19} />
              </button>
            </div>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Give your post a title"
              maxLength={150}
              className="mt-5 w-full border-b border-gray-200 pb-3 text-lg font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#013364]"
            />

            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="What would you like to share?"
              maxLength={5000}
              rows={5}
              className="mt-4 w-full resize-none text-sm leading-6 text-gray-700 outline-none placeholder:text-gray-400"
            />

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-xs text-gray-400">
                {content.length}/5000
              </span>

              <button
                type="submit"
                disabled={creating || !title.trim() || !content.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-[#013364] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#081f38] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={16} />

                {creating ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* ERROR */}
      {error && <p className="mt-5 text-sm text-red-600">{error}</p>}

      {/* LOADING */}
      {loading && (
        <div className="py-12">
          <p className="text-sm text-gray-500">Loading community...</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && posts.length === 0 && (
        <section className="py-16 text-center">
          <MessageCircle size={30} className="mx-auto text-[#013364]" />

          <h2 className="mt-5 text-lg font-semibold text-gray-900">
            Start the conversation
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Be the first person to share an interview experience or ask a
            question.
          </p>
        </section>
      )}

      {/* POSTS */}
      {!loading && posts.length > 0 && (
        <section className="divide-y divide-gray-200">
          {posts.map((post) => (
            <article key={post._id} className="py-8">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef4fa] text-sm font-semibold text-[#013364]">
                  {post.userId?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {post.userId?.name || "User"}
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <h2 className="mt-5 text-lg font-semibold text-gray-950">
                {post.title}
              </h2>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-gray-600">
                {post.content}
              </p>

              {/* POST ACTIONS */}
              <div className="mt-5 flex items-center gap-5">
                <button
                  onClick={() => handleToggleLike(post._id)}
                  className={`inline-flex items-center gap-2 text-sm transition ${
                    post.likedByCurrentUser
                      ? "text-[#013364]"
                      : "text-gray-500 hover:text-[#013364]"
                  }`}
                >
                  <Heart
                    size={18}
                    fill={post.likedByCurrentUser ? "currentColor" : "none"}
                  />

                  {post.likes?.length || 0}
                </button>

                <span className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <MessageCircle size={18} />
                  {post.comments?.length || 0}
                </span>
              </div>

              {/* COMMENTS */}
              <div className="mt-6 border-l border-gray-200 pl-5">
                {post.comments?.length > 0 && (
                  <div className="space-y-5">
                    {post.comments.map((comment) => (
                      <div key={comment._id}>
                        <p className="text-xs font-semibold text-gray-700">
                          {comment.userId?.name || "User"}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-gray-500">
                          {comment.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <form
                  onSubmit={(event) => handleAddComment(event, post._id)}
                  className="mt-5 flex gap-3"
                >
                  <input
                    type="text"
                    value={commentInputs[post._id] || ""}
                    onChange={(event) =>
                      setCommentInputs((current) => ({
                        ...current,
                        [post._id]: event.target.value,
                      }))
                    }
                    placeholder="Write a comment..."
                    className="min-w-0 flex-1 border-b border-gray-200 bg-transparent py-2 text-sm outline-none placeholder:text-gray-400 focus:border-[#013364]"
                  />

                  <button
                    type="submit"
                    disabled={commentLoading[post._id]}
                    className="text-sm font-semibold text-[#013364] disabled:opacity-50"
                  >
                    {commentLoading[post._id] ? "..." : "Reply"}
                  </button>
                </form>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Community;
