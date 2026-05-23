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

dotenv.config();

const router = express.Router();

router.post("/career", async (req, res) => {
  try {
    const body = updateSkillsSchema.parse(req.body);

    const modelContent = careerGuidanceprompt(body.skills);

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",

        temperature: 0.5,

        messages: [
          {
            role: "system",

            content: `
              You are an expert AI career advisor.
              Always return ONLY valid JSON.
              Do not return markdown.
              Do not use triple backticks.
            `,
          },

          {
            role: "user",

            content: modelContent,
          },
        ],
      });

    const rawText =
      completion.choices[0]
        ?.message?.content?.trim();

    if (!rawText) {
      throw new Error(
        "Did not receive a valid response from the AI model."
      );
    }
    let jsonResponse;
    try {

        const cleanedText = rawText
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
      
        const firstBrace =
          cleanedText.indexOf("{");
      
        const lastBrace =
          cleanedText.lastIndexOf("}");
      
        if (
          firstBrace === -1 ||
          lastBrace === -1
        ) {
          throw new Error(
            "No valid JSON object found."
          );
        }
      
        const jsonString =
          cleanedText.slice(
            firstBrace,
            lastBrace + 1
          );
      
        jsonResponse =
          JSON.parse(jsonString);
      
      } catch (err) {
      
        console.log(
          "RAW AI RESPONSE:",
          rawText
        );
      
        throw new Error(
          "Failed to parse AI response."
        );
      }

    return res.status(200).json({
      success: true,
      data: jsonResponse,
    });

  } catch (error: any) {

    if (
      error instanceof ZodError
    ) {

      return res.status(400).json({
        success: false,

        message:
          error.issues
            .map((e) => e.message)
            .join(", "),
      });
    }
console.log(error)
    return handleAIError(
      error,
      res
    );
  }
});

/* -------------------------------- */
/* RESUME ANALYSER */
/* -------------------------------- */

router.post(
  "/resume-analyser",

  async (req, res) => {

    try {

      const { pdfBase64 } =
        resumeAnalyserSchema.parse(
          req.body
        );

      const cleanedBase64 =
        pdfBase64.replace(
          /^data:application\/pdf;base64,/,
          ""
        );

      const pdfBuffer =
        Buffer.from(
          cleanedBase64,
          "base64"
        );

      /* PDF PARSE */

      const parser =
        new PDFParse({
          data: pdfBuffer,
        });

      const parsedPdf =
        await parser.getText();

      const extractedText =
        parsedPdf.text;

      if (!extractedText) {

        return res.status(400).json({
          success: false,

          message:
            "Unable to extract text from resume.",
        });
      }

      const prompt = `
        ${resumeAnalyserPrompt()}

        Resume Content:

        ${extractedText}
      `;

      const completion =
        await groq.chat.completions.create({

          model:
            "llama-3.1-8b-instant",

          temperature: 0.3,

          messages: [

            {
              role: "system",

              content: `
                You are an expert ATS and resume analysis AI.
                Always return ONLY valid JSON.
                Do not return markdown.
                Do not use triple backticks.
              `,
            },

            {
              role: "user",

              content: prompt,
            },
          ],
        });

      const rawText =
        completion.choices[0]
          ?.message?.content
          ?.trim();

      if (!rawText) {

        throw new Error(
          "Did not receive a valid response from the AI model."
        );
      }

      let jsonResponse;

      try {

        jsonResponse =
          JSON.parse(rawText);

      } catch {

        throw new Error(
          "Failed to parse AI response."
        );
      }

      return res.status(200).json({
        success: true,

        data: jsonResponse,
      });

    } catch (error: any) {

      if (
        error instanceof ZodError
      ) {

        return res.status(400).json({
          success: false,

          message:
            error.issues
              .map((e) => e.message)
              .join(", "),
        });
      }

      return handleAIError(
        error,
        res
      );
    }
  }
);

export default router;