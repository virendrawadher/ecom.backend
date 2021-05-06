const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
app = express()

app.use(cors())
app.use(express.json())

const categoryV1 = require("./route/category.route.js")

const productV1 = require("./route/product.route")

const registerV1 = require("./route/register.route")

const loginV1 = require("./route/login.route")

const cartV1 = require("./route/cart.route")

const wishListV1 = require("./route/wishlist.route")

const initializationDBConnection = require("./dB/dB.connect")

initializationDBConnection()

app.use("/category", categoryV1)

app.use("/product", productV1)

app.use("/register", registerV1)

app.use("/login", loginV1)

app.use("/cart", cartV1)

app.use("/wishlist", wishListV1)

app.get("/", (req, res) => {
    res.json({hello: "Hello world" })
})

app.listen(3000, () => {
  console.log("App listening at port 3000")
})