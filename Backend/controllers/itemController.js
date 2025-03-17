import asyncHandler from 'express-async-handler';
import Item from '..';
import Order from '../models/OrderModel.js';

// @desc    Add a new item
// @route   POST /api/items/add
// @access  Private/Admin
const addItem = asyncHandler(async (req, res) => {
    const { name, price, description } = req.body;

    const item = new Item({
        name,
        price,
        description,
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
});

// @desc    List all items
// @route   GET /api/items/list
// @access  Public
const listItems = asyncHandler(async (req, res) => {
    const items = await Item.find({});
    res.json(items);
});

// @desc    Get all orders
// @route   GET /api/items/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
});

export { addItem, listItems, getOrders };
