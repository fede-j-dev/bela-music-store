const Genre = require("../models/genreModel");
const Products = require("../models/productModel");

const genreCtrl = {
  getGenres: async (req, res) => {
    try {
      const genres = await Genre.find();
      res.json(genres);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createGenre: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update genre
      const { name } = req.body;
      const genre = await Genre.findOne({ name });
      if (genre)
        return res.status(400).json({ msg: "This genre already exists." });

      const newGenre = new Genre({ name });

      await newGenre.save();
      res.json({ msg: "Created a genre" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteGenre: async (req, res) => {
    try {
      const products = await Products.findOne({ genre: req.params.id });
      if (products)
        return res.status(400).json({
          msg: "Please delete all products with a relationship.",
        });

      await Genre.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Genre" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateGenre: async (req, res) => {
    try {
      const { name } = req.body;
      await Genre.findOneAndUpdate({ _id: req.params.id }, { name });

      res.json({ msg: "Updated a genre" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = genreCtrl;
