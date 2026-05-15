const Blog = require("../models/blog.model");

const createBlog = async (req, res) => {
    try {
        const { title, content, tags, category } = req.body;

        const blog = await Blog.create({
            author: req.user.id,
            title,
            content,
            tags,
            category
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const { tag, category } = req.query;
        let query = {};

        if (tag) {
            query.tags = { $in: [new RegExp(tag, 'i')] };
        }

        if (category) {
            query.category = { $regex: category, $options: 'i' };
        }

        const blogs = await Blog.find(query)
            .populate("author", "name profilePicture")
            .sort({ createdAt: -1 });

        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name profilePicture");
        
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await blog.deleteOne();
        res.json({ message: "Blog deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBlog, getAllBlogs, getBlogById, deleteBlog };