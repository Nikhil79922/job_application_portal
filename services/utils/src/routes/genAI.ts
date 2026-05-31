import express from "express";
import dotenv from "dotenv";
import { PDFParse } from "pdf-parse";
import { ZodError } from "zod";

import { updateSkillsSchema } from "../dtos/career.schema.js";
import { resumeAnalyserSchema } from "../dtos/resumeAnalyser.schema.js";

import { careerGuidanceprompt } from "../shared/careerGuidanceprompt.js";
import { resumeAnalyserPrompt } from "../shared/resumeAnalyserPrompt.js";

import { handleAIError } from "../services/helperHandler.js";
import groq from "../config/groq.js";
import logger from "../config/logger.js";

dotenv.config();

const router = express.Router();

const SYSTEM_PROMPT_CAREER = `
  You are an expert AI career advisor.
  Always return ONLY a raw JSON object.
  No explanation, no preamble, no markdown, no backticks.
  Start your response with { and end with }.
`;

const SYSTEM_PROMPT_RESUME = `
  You are an expert ATS and resume analysis AI.
  Always return ONLY a raw JSON object.
  No explanation, no preamble, no markdown, no backticks.
  Start your response with { and end with }.
`;

function extractJSON(raw: string): unknown {
  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No valid JSON object found in AI response.");
  }

  return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
}

/* -------------------------------- */
/* CAREER GUIDANCE                  */
/* -------------------------------- */

router.post("/career", async (req, res) => {
  try {
    const body = updateSkillsSchema.parse(req.body);
    const modelContent = careerGuidanceprompt(body.skills);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.5,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT_CAREER },
        { role: "user", content: modelContent },
      ],
    });

    const rawText = completion.choices[0]?.message?.content?.trim();

    if (!rawText) {
      throw new Error("Did not receive a valid response from the AI model.");
    }

    let jsonResponse: unknown;

    try {
      jsonResponse = extractJSON(rawText);
    } catch (err) {
      logger.error("Failed to parse AI response", {
        rawText,
        error: err instanceof Error ? err.message : String(err),
      });
      throw new Error("Failed to parse AI response.");
    }

    return res.status(200).json({ success: true, data: jsonResponse });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues.map((e) => e.message).join(", "),
      });
    }

    logger.error("Career endpoint error", { error });
    return handleAIError(error, res);
  }
});

/* -------------------------------- */
/* RESUME ANALYSER                  */
/* -------------------------------- */

router.post("/resume-analyser", async (req, res) => {
  try {
    const { pdfBase64 } = resumeAnalyserSchema.parse(req.body);

    const cleanedBase64 = pdfBase64.replace(
      /^data:application\/pdf;base64,/,
      ""
    );

    const pdfBuffer = Buffer.from(cleanedBase64, "base64");

    const parser = new PDFParse({ data: pdfBuffer });
    const parsedPdf = await parser.getText();
    const extractedText = parsedPdf.text;

    if (!extractedText) {
      return res.status(400).json({
        success: false,
        message: "Unable to extract text from resume.",
      });
    }

    const prompt = `
      ${resumeAnalyserPrompt()}

      Resume Content:

      ${extractedText}
    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT_RESUME },
        { role: "user", content: prompt },
      ],
    });

    const rawText = completion.choices[0]?.message?.content?.trim();

    if (!rawText) {
      throw new Error("Did not receive a valid response from the AI model.");
    }

    let jsonResponse: unknown;

    try {
      jsonResponse = extractJSON(rawText);
    } catch (err) {
      logger.error("Failed to parse resume AI response", {
        rawText,
        error: err instanceof Error ? err.message : String(err),
      });
      throw new Error("Failed to parse AI response.");
    }

    return res.status(200).json({ success: true, data: jsonResponse });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues.map((e) => e.message).join(", "),
      });
    }

    return handleAIError(error, res);
  }
});

export default router;