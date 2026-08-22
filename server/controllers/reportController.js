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
        aiInsights: {
          strengths: [],
          weaknesses: [],
          recommendedFocus: "",
        },
        recentInterviews: [],
      });
    }

    // Summary calculations
    const totalScore = completedInterviews.reduce(
      (sum, interview) => sum + interview.overallScore,
      0,
    );

    const averageScore = Math.round(totalScore / totalCompleted);

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

    // Parse and aggregate AI feedback
    const allStrengths = [];
    const allWeaknesses = [];

    completedInterviews.forEach((interview) => {
      if (!interview.feedback) return;

      try {
        const parsedFeedback = JSON.parse(interview.feedback);

        if (Array.isArray(parsedFeedback.strengths)) {
          allStrengths.push(...parsedFeedback.strengths);
        }

        if (Array.isArray(parsedFeedback.weaknesses)) {
          allWeaknesses.push(...parsedFeedback.weaknesses);
        }
      } catch (error) {
        console.error(
          `Failed to parse feedback for interview ${interview._id}:`,
          error.message,
        );
      }
    });

    // Count repeated feedback items
    const getMostCommon = (items, limit = 3) => {
      const counts = {};

      items.forEach((item) => {
        if (!item?.trim()) return;

        const normalizedItem = item.trim().toLowerCase();

        if (!counts[normalizedItem]) {
          counts[normalizedItem] = {
            text: item.trim(),
            count: 0,
          };
        }

        counts[normalizedItem].count += 1;
      });

      return Object.values(counts)
        .sort((a, b) => b.count - a.count)
        .slice(0, limit)
        .map((item) => item.text);
    };

    const strengths = getMostCommon(allStrengths);
    const weaknesses = getMostCommon(allWeaknesses);

    // Determine recommended focus
    let recommendedFocus = "";

    if (weaknesses.length > 0) {
      recommendedFocus = `Focus on improving ${weaknesses[0].toLowerCase()} in your next few interviews.`;
    } else if (totalCompleted > 0) {
      recommendedFocus =
        "Keep practicing consistently to identify more specific areas for improvement.";
    }

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
      aiInsights: {
        strengths,
        weaknesses,
        recommendedFocus,
      },
      recentInterviews,
    });
  } catch (error) {
    console.error("GET REPORTS ERROR:", error);

    return res.status(500).json({
      message: error.message || "Failed to generate reports",
    });
  }
};