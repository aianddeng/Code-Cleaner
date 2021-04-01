const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
    {
        storeId: {
            type: String,
            required: true,
        },
        storeName: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'auto',
            enum: ['auto', 'user'],
        },
        status: {
            type: String,
            default: 'waiting',
            enum: ['waiting', 'doing', 'error', 'finished'],
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

const Task = mongoose.model('task', TaskSchema)

module.exports = Task
