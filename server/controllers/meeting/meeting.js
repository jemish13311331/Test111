const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');

const add = async (req, res) => {
    try {
        console.log();
        
        const result = new MeetingHistory(req.body);
        await result.save();
        return res.status(200).json(result);
    } catch (err) {
        console.error('Failed to create:', err);
        return res.status(400).json({ err, error: 'Failed to create' });
    }
};

const index = async (req, res) => {
    
     try{
         const result = await MeetingHistory?.find({ deleted: false });
         return res.status(200).json(result);
     }catch(err){
         console.error("Error :", err);
         return res.status(400).json({ err, error: "Something wents wrong" });
     }
     
    
}

const view = async (req, res) => {
    try{
        const result = await MeetingHistory.findById({ _id: req.params.id });
        console.log(req.params.id);
        return res.status(200).json(result);
    }catch(err){
         console.error('Failed to fetch meeting data:', err);
         return res.status(400).json({ err, error: 'Failed to fetch' });
    }
    
}

const deleteData = async (req, res) => {
  
    try {
        // Delete records where _id is in the provided ids
        const result = await MeetingHistory.deleteOne({ _id: req.params.id });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'No meetings found with the provided ID' });
        }

        return res.status(200).json({ message: `${result.deletedCount} meeting deleted successfully`, result });
    } catch (err) {
        console.error('Failed to delete many:', err);
        return res.status(400).json({ err, error: 'Failed to delete' });
    }
}

const deleteMany = async (req, res) => {
   const { ids } = req.body; // Assuming ids are passed in the body

    if (!ids || ids.length === 0) {
        return res.status(400).json({ error: 'No IDs provided for deletion' });
    }

    try {
        const result = await MeetingHistory.deleteMany({ _id: { $in: ids } });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'No meetings found with the provided IDs' });
        }
        return res.status(200).json({ message: `${result.deletedCount} meeting(s) deleted successfully`, result });
    } catch (err) {
        console.error('Failed to delete many:', err);
        return res.status(400).json({ err, error: 'Failed to delete' });
    }
}

module.exports = { add, index, view, deleteData, deleteMany }