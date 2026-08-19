import Interview from "../models/Interview.js";
import Resume from "../models/Resume.js";
import {
  generateInterviewQuestions,
  evaluateInterviewAnswer,
  generateInterviewFeedback,
} from "../services/geminiServices.js";

//getting all the interviews
export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ interviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//getting a single interview
export const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.status(200).json({ interview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// generate AI interview questions
export const generateQuestions = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    // Questions already generated
    if (interview.questions.length > 0) {
      return res.status(200).json({
        message: "Interview questions already generated",
        questions: interview.questions,
        interview,
      });
    }

    // Get user's latest resume
    const resume = await Resume.findOne({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    // Generate questions using Gemini
    const questions = await generateInterviewQuestions({
      resumeText: resume?.extractedText || "",
      targetRole: interview.targetRole,
      company: interview.company,
      interviewType: interview.interviewType,
      difficulty: interview.difficulty,
      questionCount: interview.questionCount,
    });

    const formattedQuestions = questions.map((question) => ({
      question,
      answer: "",
      score: null,
      feedback: "",
    }));

    /*using the findone and update instead of .save() because itll help us handle the 
     error coming from two or multiple requests joki save ka try kar rhe ho
    */

    const updatedInterview = await Interview.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
        questions: { $size: 0 },
      },
      {
        $set: {
          questions: formattedQuestions,
          status: "in-progress",
        },
      },
      {
        returnDocument: "after",
      },
    );

    /*
    wo case jab dusri requeest already generate aur save kar chuki ho ques lekin humari req 
    abhi bhi working ho
    so us case me updatedInterview null hi rhega aur hum already generated questions ko bhej denge
    */

    if (!updatedInterview) {
      const existingInterview = await Interview.findOne({
        _id: req.params.id,
        userId: req.userId,
      });

      if (!existingInterview) {
        return res.status(404).json({
          message: "Interview not found",
        });
      }

      return res.status(200).json({
        message: "Interview questions already generated",
        questions: existingInterview.questions,
        interview: existingInterview,
      });
    }

    res.status(200).json({
      message: "Interview questions generated successfully",
      questions: updatedInterview.questions,
      interview: updatedInterview,
    });
  } catch (error) {
    console.error("GENERATE INTERVIEW QUESTIONS ERROR:", error);

    res.status(500).json({
      message: error.message || "Failed to generate interview questions",
    });
  }
};

// Evaluate a candidate's answer using AI
export const evaluateAnswer = async (req, res) => {
  try {
    const { questionId, answer } = req.body;

    if (!questionId) {
      return res.status(400).json({
        message: "Question ID is required",
      });
    }

    if (!answer?.trim()) {
      return res.status(400).json({
        message: "Answer is required",
      });
    }

    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const question = interview.questions.id(questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const evaluation = await evaluateInterviewAnswer({
      question: question.question,
      answer,
      targetRole: interview.targetRole,
      interviewType: interview.interviewType,
      difficulty: interview.difficulty,
    });

    question.answer = answer.trim();
    question.score = evaluation.score;
    question.feedback = evaluation.feedback;

    await interview.save();

    res.status(200).json({
      message: "Answer evaluated successfully",
      question,
      interview,
    });
  } catch (error) {
    console.error("EVALUATE ANSWER ERROR:", error);

    res.status(500).json({
      message: error.message || "Failed to evaluate answer",
    });
  }
};

//creating a new interview
export const createInterview = async (req, res) => {
  try {
    const { company, targetRole, interviewType, difficulty, questionCount } =
      req.body;

    const interview = await Interview.create({
      userId: req.userId,
      company,
      targetRole,
      interviewType,
      difficulty,
      questionCount: Number(questionCount) || 10,
      status: "created",
      questions: [],
    });

    res.status(201).json({
      message: "Interview created",
      interview,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//updating an interview

export const updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
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

    if (company !== undefined) {
      interview.company = company;
    }
    if (targetRole !== undefined) {
      interview.targetRole = targetRole;
    }
    if (interviewType !== undefined) {
      interview.interviewType = interviewType;
    }
    if (difficulty !== undefined) {
      interview.difficulty = difficulty;
    }
    if (questionCount !== undefined) {
      interview.questionCount = questionCount;
    }
    if (status !== undefined) {
      interview.status = status;
    }
    if (questions !== undefined) {
      interview.questions = questions;
    }
    if (overallScore !== undefined) {
      interview.overallScore = overallScore;
    }
    if (feedback !== undefined) {
      interview.feedback = feedback;
    }

    await interview.save();

    res.status(200).json({ message: "Interview updated", interview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Complete interview and generate final evaluation
export const completeInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const questions = interview.questions || [];

    if (questions.length === 0) {
      return res.status(400).json({
        message: "Interview has no questions",
      });
    }

    // Make sure every question has been evaluated
    const unevaluatedQuestions = questions.filter(
      (question) => question.score === null || question.score === undefined,
    );

    if (unevaluatedQuestions.length > 0) {
      return res.status(400).json({
        message: "Please answer all questions before completing the interview",
      });
    }

    // Calculate overall score ourselves
    const totalScore = questions.reduce(
      (total, question) => total + question.score,
      0,
    );

    const averageScore = totalScore / questions.length;

    // Convert 0-10 score to 0-100
    const overallScore = Math.round(averageScore * 10);

    // Generate overall qualitative feedback using Gemini
    const feedback = await generateInterviewFeedback({
      targetRole: interview.targetRole,
      company: interview.company,
      interviewType: interview.interviewType,
      difficulty: interview.difficulty,
      questions,
    });

    // Save final interview result
    interview.overallScore = overallScore;

    interview.feedback = JSON.stringify(feedback);

    interview.status = "completed";

    await interview.save();

    res.status(200).json({
      message: "Interview completed successfully",
      interview,
      overallScore,
      feedback,
    });
  } catch (error) {
    console.error("COMPLETE INTERVIEW ERROR:", error);

    res.status(500).json({
      message: error.message || "Failed to complete interview",
    });
  }
};
