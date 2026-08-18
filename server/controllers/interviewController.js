import Interview from "../models/Interview.js"

//getting all the interviews
export const getInterviews = async(req, res)=>{
    try {
        const interviews = await Interview.find({userId : req.userId }).sort({createdAt : -1});
        res.status(200).json({interviews});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//getting a single interview
export const getInterview = async(req,res)=>{
    try {
        const interview = await Interview.findOne({_id: req.params.id, userId: req.userId});
        if(!interview){
            return res.status(404).json({message: "Interview not found"});
        }

        res.status(200).json({interview});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//creating a new interview
export const createInterview = async (req,res)=>{
    try {
        const {
            company,
            targetRole,
            interviewType,
            difficulty,
            questionCount,
        } = req.body;

        const interview = await Interview.create({
            userId : req.userId,
            company,
            targetRole,
            interviewType,
            difficulty,
            questionCount: Number(questionCount) || 10,
            status: "created",
            questions: [],
        });

        res.status(201).json({
            message : "Interview created",
            interview, 
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//updating an interview

export const updateInterview = async(req,res)=>{
    try {
        const interview = await Interview.findOne({_id: req.params.id, userId: req.userId});

        if(!interview){
            return res.status(404).json({message: "Interview not found"});
        }
        const {
            company,
            targetRole,
            interviewType,
            difficulty,
            questionCount,
            status,
            questions,
            overallScore,
            feedback,
        } = req.body;

        if(company!==undefined) {interview.company = company}
        if(targetRole!==undefined) {interview.targetRole = targetRole}
        if(interviewType!==undefined) {interview.interviewType = interviewType}
        if(difficulty!==undefined) {interview.difficulty = difficulty}
        if(questionCount!==undefined) {interview.questionCount = questionCount}
        if(status!==undefined) {interview.status = status}
        if(questions!==undefined) {interview.questions = questions}
        if(overallScore!==undefined) {interview.overallScore = overallScore}
        if(feedback!==undefined) {interview.feedback = feedback}

        await interview.save();

        res.status(200).json({message: "Interview updated", interview})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//complete interview
export const completeInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!interview) {
      return res.status(404).json({message: "Interview not found"});
    }

    interview.status = "completed";
    await interview.save();

    res.status(200).json({
      message: "Interview completed", interview
    });

  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};