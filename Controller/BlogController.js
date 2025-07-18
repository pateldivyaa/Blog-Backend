const blog = require('../Modal/BlogSchema');

// Create blog with optional image upload
exports.createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const image = req.file ? req.file.filename : null;
        
        const blogData = { title, content, author };
        if (image) {
            blogData.image = image;
        }
        
        const blogPost = await blog.create(blogData);
        res.status(201).json(blogPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await blog.find().populate('author', 'name email');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const updatedBlog = await blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        await blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};