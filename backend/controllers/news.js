const News = require("../models/news");
const User = require("../models/user");

class NewsController {
    createNews = async (req, res) => {
        try {
            const news = await new News({
                value: req.body.value,
            });
            console.log(req.body)
            await news.save();
            return res.status(201).json({
                success: true,
                news
            })
        } catch (e) {

        }
    };
    readedNews = async (req, res) => {
        try {

        } catch (e) {

        }
    }
    getNews = async (req, res) => {
        try {
            let news = await News.find({});
            return res.status(201).json({
                success: true,
                news
            })
        } catch (e) {
            console.log(e.message)
        }
    }
}

const newsController = new NewsController();

module.exports = {
    newsController,
};
