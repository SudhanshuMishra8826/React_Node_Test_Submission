const { meeting } = require('../../model/schema/meeting');

const add = async (req, res) => {
    const meeting_obj = new meeting(req.body);
    await meeting_obj.save();
    res.status(201).json(meeting_obj);
}

const index = async (req, res) => {
    const meetings = await meeting.find();
    res.status(200).json(meetings);
}

const view = async (req, res) => {
    const meeting_obj = await meeting.findById(req.params.id);
    res.status(200).json(meeting_obj);
}

const deleteData = async (req, res) => {
    const meeting_obj = await meeting.findByIdAndDelete(req.params.id);
    res.status(200).json(meeting_obj);
}

const deleteMany = async (req, res) => {
    const ids = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'Please provide an array of valid IDs' });
    }

    try {
        // First check if all meetings exist
        const existingMeetings = await meeting.find({ _id: { $in: ids } });
        if (existingMeetings.length !== ids.length) {
            return res.status(404).json({
                error: 'Some meetings were not found',
                found: existingMeetings.length,
                requested: ids.length
            });
        }

        const meeting_obj = await meeting.deleteMany({ _id: { $in: ids } });
        res.status(200).json(meeting_obj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { add, index, view, deleteData, deleteMany }