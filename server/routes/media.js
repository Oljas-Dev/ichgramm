import express from "express";
import { randomUUID } from "crypto";
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3 from "../config/s3.js";
import authenticateJWT from "../middleware/authMiddleware.js";

const router = express.Router();

const bucket = process.env.AWS_S3_BUCKET;

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// Generate a temporary upload URL
router.post("/presign", authenticateJWT, async (req, res) => {
  try {
    const { contentType, folder } = req.body;

    if (!allowedTypes.includes(contentType)) {
      return res.status(400).json({
        message: "Unsupported image format",
      });
    }

    if (!["avatars", "posts"].includes(folder)) {
      return res.status(400).json({
        message: "Invalid upload folder",
      });
    }

    const userId = req.user.id;
    const extension = contentType.split("/")[1];

    const key = `${folder}/${userId}/${randomUUID()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 300,
    });

    res.status(200).json({
      uploadUrl,
      key,
    });
  } catch (error) {
    console.error("S3 presign error:", error);

    res.status(500).json({
      message: "Could not generate upload URL",
    });
  }
});

// Generate a temporary viewing URL
router.get("/view", async (req, res) => {
  try {
    const { key } = req.query;

    if (typeof key !== "string") {
      return res.status(400).json({
        message: "Invalid image key",
      });
    }

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const viewUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    res.status(200).json({ viewUrl });
  } catch (error) {
    console.error("S3 view URL error:", error);

    res.status(500).json({
      message: "Could not generate image URL",
    });
  }
});

// Delete an image from S3
router.delete("/", authenticateJWT, async (req, res) => {
  try {
    const { key } = req.body;
    const userId = req.user.id;

    if (
      typeof key !== "string" ||
      (!key.startsWith(`avatars/${userId}/`) &&
        !key.startsWith(`posts/${userId}/`))
    ) {
      return res.status(403).json({
        message: "You cannot delete this image",
      });
    }

    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );

    res.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("S3 delete error:", error);

    res.status(500).json({
      message: "Could not delete image",
    });
  }
});

export default router;
