import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are missing from environment variables.");
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Placing user order from frontend
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        
        // Validate user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Save order in DB (Pending Payment)
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            payment: false // Initially false, updated after successful payment
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Create Razorpay order
        const options = {
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: `order_rcptid_${newOrder._id}`, // Unique receipt ID
            payment_capture: 1 // Auto-capture payment
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.json({ 
            success: true, 
            orderId: razorpayOrder.id, 
            amount: amount * 100, 
            key: process.env.RAZORPAY_KEY_ID 
        });

    } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Verifying Payment (Webhook or Manual)
const verifyPayment = async (req, res) => {
    try {
        const { orderId, paymentStatus } = req.body;

        // Ensure we are not using ObjectId conversion for non-ObjectId values
        const order = await Order.findOneAndUpdate(
            { orderId: orderId }, // Use orderId instead of _id
            { paymentStatus: paymentStatus },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Payment verified", order });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Fetch user orders
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }

        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Fetch User Orders Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// List all orders for the admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        
        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }

        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("List Orders Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        // Validate order
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error("Update Order Status Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { placeOrder, verifyPayment, userOrders, listOrders, updateStatus };
