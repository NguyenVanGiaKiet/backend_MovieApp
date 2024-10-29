const express = require('express');
const users = require('../models/users');
const router = express.Router();

// Lấy tất cả phim từ cả 2 danh mục
router.get('/', async (req, res) => {
    try {
        const user = await users.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    const user = new users(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Xóa phim theo ID
router.delete('/:_id', async (req, res) => {
    try {
        const user = await users.findByIdAndDelete(req.params._id);
        if (!user) return res.status(404).json({ message: 'Không tìm thấy User' });
        res.json({ message: 'User đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// **Cập nhật thông tin User (poster_path) qua email**
router.put('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { poster_path } = req.body;

        // Tìm và cập nhật poster_path của User dựa trên email
        const updatedUser = await users.findOneAndUpdate(
            { email },
            { poster_path },
            { new: true } // Trả về User sau khi cập nhật
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Không tìm thấy User với email này' });
        }

        res.status(200).json({ message: 'Cập nhật thành công', updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
