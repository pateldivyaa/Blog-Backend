const jwt = require('jsonwebtoken');

const adminLogin = (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@gmail.com' && password === 'admin123') {
        const token = jwt.sign({ email }, 'secret123', { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ error: 'Invalid credentials' });
};
module.exports = { adminLogin };