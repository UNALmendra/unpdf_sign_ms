import { Request, Response, NextFunction } from 'express';
import { PDFDocument } from 'pdf-lib'
import axios, { AxiosResponse } from 'axios';
import {StringifyOptions} from 'querystring';

interface Sign {
    id_sign : number;
    userId : string;
    image_url : string;
    alt_image : string;
}

async function embedImages(signUrl: string) {
  const jpgUrl = 'https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg'

  const jpgImageBytes = await axios.get(jpgUrl,{
      responseType: 'arraybuffer'
  })
  .then(response => Buffer.from(response.data, 'binary').toString('base64'))

  const pdfDoc = await PDFDocument.create()

  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)

  const jpgDims = jpgImage.scale(0.5)

  const page = pdfDoc.addPage()

  page.drawImage(jpgImage, {
    x: page.getWidth() / 2 - jpgDims.width / 2,
    y: page.getHeight() / 2 - jpgDims.height / 2 + 250,
    width: jpgDims.width,
    height: jpgDims.height,
  })

  const pdfBytes = await pdfDoc.save()
}


// adding a signature
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
    return res.status(200).json(
        response.data
    );
};

const postSign2Pdf = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    embedImages(title);
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

export default { postSign, postSign2Pdf };

