const mongoose = require('mongoose');

const fetchSchemaFields = async () => {
    const CustomFieldModel = mongoose.model('CustomField');
    return await CustomFieldModel.find({ moduleName: "Meetings" });
};

const meetingHistory = new mongoose.Schema({
    agenda: { type: String, required: true },
    attendes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
    }],
    attendesLead: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
    }],
    location: String,
    related: String,
    dateTime: String,
    notes: String,
    // meetingReminders: { type: String, required: true },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false,
    },
})

const initializeMeetingSchema = async () => {
    const schemaFieldsData = await fetchSchemaFields();
    schemaFieldsData[0]?.fields?.forEach((item) => {
        meetingHistory.add({ [item.name]: item?.backendType });
    });
};

const meeting = mongoose.model('Meeting', meetingHistory, 'Meeting');

module.exports = { initializeMeetingSchema, meeting, meetingHistory };
