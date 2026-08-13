import Interview from "../models/Interview.js"

export const getInterviews = async(req, res)=>{
    try {
        const interviews = await Interview.find({userId : req.userId }).sort({createdAt : -1});
        res.json({interviews});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createInterview = async (req,res)=>{
    try {
        const {company, interviewType, questions} = req.body;
        const interview = await Interview.create({
            userId : req.userId,
            company,
            interviewType,
            questions,
        });

        res.status(201).json({
            message : "Interview created",
            interview, 
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}