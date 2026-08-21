import Interview from "../models/Interview.js";

export const getReports = async (req, res) => {
  try {
    const completedInterviews = await Interview.find({
      userId: req.userId,
      status: "completed",
      overallScore: { $ne: null },
    })
      .sort({ createdAt: 1 })
      .select(
        "company targetRole interviewType difficulty overallScore createdAt feedback",
      );

    const totalCompleted = completedInterviews.length;

    if (totalCompleted === 0) {
      return res.status(200).json({
        summary: {
          totalCompleted: 0,
          averageScore: 0,
          bestScore: 0,
        },
        performanceTrend: [],
        recentInterviews: [],
      });
    }

    // Average score
    const totalScore = completedInterviews.reduce(
      (sum, interview) => sum + interview.overallScore,
      0,
    );

    const averageScore = Math.round(totalScore / totalCompleted);

    // Best score
    const bestScore = Math.max(
      ...completedInterviews.map((interview) => interview.overallScore),
    );

    // Performance trend
    const performanceTrend = completedInterviews.map((interview) => ({
      interviewId: interview._id,
      score: interview.overallScore,
      company: interview.company || "General",
      targetRole: interview.targetRole,
      date: interview.createdAt,
    }));

    // Latest 5 interviews
    const recentInterviews = [...completedInterviews]
      .reverse()
      .slice(0, 5)
      .map((interview) => ({
        _id: interview._id,
        company: interview.company || "General",
        targetRole: interview.targetRole,
        interviewType: interview.interviewType,
        difficulty: interview.difficulty,
        overallScore: interview.overallScore,
        createdAt: interview.createdAt,
      }));

    return res.status(200).json({
      summary: {
        totalCompleted,
        averageScore,
        bestScore,
      },
      performanceTrend,
      recentInterviews,
    });
  } catch (error) {
    console.error("GET REPORTS ERROR:", error);

    return res.status(500).json({
      message: error.message || "Failed to generate reports",
    });
  }
};