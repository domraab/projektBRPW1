const saveCategory = require('express').Router();
const modelCategory = require('../../database/categoryModel');

saveCategory.post("/save-category", (req, res) => {
    const { name, description} = req.body;
    const category = new modelCategory({
        name:name,
        description:description
    });

    category.save()
        .then(document => {
            return res.json({
                msg: `Došlo k uložení kategorie ${JSON.stringify(document.name)}`
            });
        })
        .catch(err => {
            return res.json({
                msg: "Bohužel nedošlo k uložení kategorie"
            });
        });
});

module.exports = saveCategory;