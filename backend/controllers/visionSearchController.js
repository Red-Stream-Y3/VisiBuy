import asyncHandler from "express-async-handler";
import axios from "axios";
import e from "express";

//constants
const VISION_SERVER = "https://visibuy-vision-ukkxew3r5q-uc.a.run.app";
const PRODUCT_SET = "VP-supermarket";
const PRODUCT_CATEGORY = "packagedgoods-v1";

const visionSearch = asyncHandler(async (req, res) => {
    const body = {
        productSetId: PRODUCT_SET,
        productCategory: PRODUCT_CATEGORY,
        filter : req.body.filter,
        cloudLink : req.body.cloudLink,
        image: req.body.image
    };

    await axios.post(`${VISION_SERVER}/api/search`, body)
    .then(response => {
        
        //check if there is a result
        if (response.data?.length > 0) {
            res.json({ result: response.data[0].product?.displayName || 'No results found' });
        } else {
            res.json({ result: 'No results found' });
        }

    }).catch(error => {
        console.debug(error);
        res.status(500).json({ result: 'No results found' });
    });
});

export { visionSearch };