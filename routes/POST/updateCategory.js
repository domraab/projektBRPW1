const updateCategory = require('express').Router();
const modelCategory = require('../../database/categoryModel');

updateCategory.put("/update-category/:categoryId", (req, res) => {
    const categoryId = req.params.categoryId;
    const { name, description} = req.body;
    console.log(name + description);

    modelCategory.findByIdAndUpdate(categoryId, {
        name:name,
        description:description,
    }, { new: true })
        .then(updatedCategory => {
            if (!updatedCategory) {
                return res.status(404).json({ msg: "Kategorie nebyla nalezena." });
            }
            return res.json({ msg:`Kategorie ${updatedCategory.name} byla aktulizována, updatedCategory` });
        })
        .catch(err => {
            console.error("Chyba při aktualizaci produktu:", err);
            return res.status(500).json({ msg: "Nastala chyba při aktualizaci produktu." });
        });
});

module.exports = updateCategory;