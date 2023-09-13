import axios from "axios";

//constants
const VISION_SERVER = "https://visibuy-vision-ukkxew3r5q-uc.a.run.app";
const PRODUCT_SET = "VP-supermarket";
const PRODUCT_CATEGORY = "packagedgoods-v1";

export const visionDirectScan = async (filter, cloudLink, image) => new Promise(async (resolve, reject) => {
    const body = {
        productSetId: PRODUCT_SET,
        productCategory: PRODUCT_CATEGORY,
        filter : filter,
        cloudLink : cloudLink,
        image: image
    };

    await axios.post(`${VISION_SERVER}/api/search`, body)
    .then(response => {
        
        //check if there is a result
        if (response.data?.length > 0) {
            resolve({ result: response.data[0].product?.displayName || 'No results found' });
        } else {
            reject({ message: 'No results found' });
        }

    }).catch(error => {
        console.debug(error);
        reject({ message: 'No results found' });
    });
});