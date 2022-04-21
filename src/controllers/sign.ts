import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Sign {
    id : number;
    userId : string;
    image_url : string;
    alt_image : string;
}

// adding a post
const postSign = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

export default { postSign };

