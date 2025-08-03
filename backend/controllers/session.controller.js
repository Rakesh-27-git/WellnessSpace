import { ApiError } from "../utils/ApiError.js";
import { Session } from "../models/session.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getPublicSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ status: "published" }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, sessions, "Public sessions fetched"));
});

const getMySessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ user: req.user._id }).sort({
    updatedAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, sessions, "User sessions fetched"));
});

const getSessionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const session = await Session.findOne({ _id: id, user: req.user._id });
  if (!session) throw new ApiError(404, "Session not found");

  return res
    .status(200)
    .json(new ApiResponse(200, session, "Session details fetched"));
});

const saveDraftSession = asyncHandler(async (req, res) => {
  const { title, tags = [], jsonUrl, sessionId } = req.body;

  if (!title || !jsonUrl) {
    throw new ApiError(400, "Title and JSON file URL are required");
  }

  let session;

  if (sessionId) {
    // Update existing draft
    session = await Session.findOneAndUpdate(
      { _id: sessionId, user: req.user._id },
      { title, tags, jsonUrl, status: "draft", updatedAt: new Date() },
      { new: true }
    );

    if (!session) {
      throw new ApiError(404, "Session not found or unauthorized");
    }
  } else {
    // Create new draft
    session = await Session.create({
      user: req.user._id,
      title,
      tags,
      jsonUrl,
      status: "draft",
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, session, "Draft session saved successfully"));
});

const publishSession = async (req, res, next) => {
  try {
    const { sessionId, title, tags, jsonUrl } = req.body;
    const userId = req.user._id;

    if (!title || !tags || !jsonUrl) {
      throw new ApiError(400, "Title, tags, and JSON URL are required");
    }

    let session;

    if (sessionId) {
      // 📝 Update existing draft
      session = await Session.findOneAndUpdate(
        { _id: sessionId, createdBy: userId },
        {
          title,
          tags,
          jsonUrl,
          status: "published",
        },
        { new: true }
      );

      if (!session) {
        throw new ApiError(404, "Draft session not found");
      }
    } else {
      // ✨ Create and publish new session
      session = await Session.create({
        title,
        tags,
        jsonUrl,
        status: "published",
        user: userId,
      });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, session, "Session published successfully"));
  } catch (error) {
    next(error);
  }
};

export {
  getPublicSessions,
  getMySessions,
  getSessionById,
  saveDraftSession,
  publishSession,
};
