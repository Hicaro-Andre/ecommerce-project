
function productsData (req, res, next){

  const {productName} = req.body

   if (!productName || productName.length < 3) {
    return res.status(400).json({ message: "Product is required and must have at least 3 characters." });
  }

   next();
}

module.exports = productsData;