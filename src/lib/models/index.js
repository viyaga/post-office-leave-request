const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already registered"],
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Admin', adminSchema)

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        employeeType: {
            type: String,
            required: true,
            enum: ['regular', 'substitute']
        },
        designation: {
            type: String,
        },
        officeName: {
            type: String,
        },
        accountNo: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.models.Employee || mongoose.model('Employee', employeeSchema)
module.exports = mongoose.models.Admin || mongoose.model('Admin')