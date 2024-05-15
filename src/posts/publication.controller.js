import { response, request } from "express";
import Publication from "./publication.model.js";

export const postsGet = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { state: true };

    try {
        const [total, posts] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .lean()
        ]);

        res.status(200).json({
            total,
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving posts' });
    }
};

export const postsPost = async (req, res) => {

    const { title, img, description, author, url } = req.body;

    const publication = new Publication({ title, img, description, author, url });

    await publication.save();

    res.status(200).json({
        publication
    });

}

