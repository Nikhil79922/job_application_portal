import express from 'express'
import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'
import  {updateSkillsSchema}  from '../dtos/career.schema.js'
import { ZodError } from "zod";
import { careerGuidanceprompt } from '../shared/careerGuidanceprompt.js';
import { resumeAnalyserPrompt } from '../shared/resumeAnalyserPrompt.js';
import { resumeAnalyserSchema } from '../dtos/resumeAnalyser.schema.js';
import { handleAIError } from '../services/helperHandler.js';


dotenv.config(); 

const router = express.Router();

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY})
router.post('/career' , async(req,res)=>{
    try {
     const body= updateSkillsSchema.parse(req.body)

     const modelContent= careerGuidanceprompt(body.skills)

     const response= await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:modelContent
     });

     let jsonResponse;

     try {
        var rawText=response.text?.replace(/```json/g, '').replace(/```/g,'').trim();
        if(!rawText){
            throw new Error(`Didn't found an invalid response from the AI model.`)
        }
        jsonResponse =JSON.parse(rawText);

        res.status(200).json(jsonResponse)
     } catch (error: any) {
        return handleAIError(
            error,
            res
          )
     }

    } catch (error: any) {
        if (error instanceof ZodError) {
            return res.status(400).json({
              success: false,
              message: error.issues.map((e: { message: any; }) => e.message).join(", "),
            });
          }
          return handleAIError(
            error,
            res
          )
    }
})

router.post('/resume-analyser' , async(req,res)=>{
    try {
        const { pdfBase64 } = resumeAnalyserSchema.parse(req.body);

     const modelContent= resumeAnalyserPrompt()

     const response= await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:[{
            role:'user',
            parts:[
                {
                    text:modelContent
                },
                {
                    inlineData:{
                        mimeType:"application/pdf",
                        data:pdfBase64.replace(/^data:application\/pdf; base64,/, "")
                    }
                }
            ]
        }]
     });

     let jsonResponse;

     try {
        var rawText=response.text?.replace(/```json/g, '').replace(/```/g,'').trim();
        if(!rawText){
            throw new Error(`Didn't found an invalid response from the AI model.`)
        }
        jsonResponse =JSON.parse(rawText);

        res.status(200).json(jsonResponse)
     } catch (error: any) {
        return handleAIError(
            error,
            res
          )
     }

    } catch (error: any) {
        if (error instanceof ZodError) {
            return res.status(400).json({
              success: false,
              message: error.issues.map((e: { message: any; }) => e.message).join(", "),
            });
          }

          return handleAIError(
            error,
            res
          )
    }
})

export default router;