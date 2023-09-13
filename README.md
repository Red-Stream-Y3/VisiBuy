# Visi Buy

## Vision Poduct Search API
### Endpoint
/api/v1/vision

### expected data
body = {
    filter, //STRING: search filters. Send null if not needed.
    cloudLink, //BOOLEAN: whether local image or URL
    image //OBJECT || STRING
};

### local image object must be base64
image = {
    base64 : "<content>",
    //optional
    uri,
    //...
}

### response
res.data.result //STRING: matched item name || "no matches found"