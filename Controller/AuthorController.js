const Author = require('../Modal/AuthorSchema');

exports.createAuthor = async (req, res) => {
    try {
        const author = new Author(req.body);
        
        await author.save();
        res.status(201).json(author);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



