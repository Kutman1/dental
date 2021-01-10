const Slot = require("../models/index");

class SlotsController {
    createSlot = async (req, res) => {
        try {
            let existsSlot = await Slot.findOne({"slots.date": req.body.slots.date})
            if (existsSlot) {
                existsSlot.slots.disabled.push(req.body.slots.disabled.join())
                await existsSlot.updateOne(existsSlot)
                return res.status(200).json({success: true})
            } else {
                const slot = new Slot({
                    ...req.body,
                });
                slot.save();
                return res.status(201).json({
                    success: true,
                    slot
                })
            }
        } catch (e) {
            console.log(e)
        }
    };

    getInfoSlots = async (req, res) => {
        try  {
            let day = await Slot.findOne({"slots.date": req.body.slots});
           if(day) {
               return res.status(200).json({
                   success: true,
                   disabled: day.slots.disabled ? day.slots.disabled: []
               })
           }else {
               return res.status(200).json({
                   disabled: []
               })
           }
        } catch (e) {
            console.log(e)
        }
    }

}

const slotsController = new SlotsController();

module.exports = {
    slotsController,
};
