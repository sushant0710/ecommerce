const express = require("express")
const {addOrderItem, getOrderById, updateOrderToPaid, getMyOrders} = require("../controller/orderControler")
const {protect} = require("../middlewares/authMiddleware")
const router = express.Router()

// get user orders
router.route("/myorders").get(protect,getMyOrders)

// create new order
router.route("/").post(protect, addOrderItem)

// get order by id
router.route("/:id").get(protect,getOrderById)

// update order
router.route("/:id/pay").put(protect,updateOrderToPaid)



module.exports = router;
