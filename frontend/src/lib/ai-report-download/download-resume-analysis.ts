"use client"

import {
  saveAs,
} from "file-saver"

import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx"

import {
  ResumeAnalyserResponse,
} from "@/types/utils/AIservice.types"

export const downloadResumeAnalysis =
  async (
    data: ResumeAnalyserResponse
  ) => {

    const doc =
      new Document({

        sections: [

          {
            properties: {},

            children: [

              /* TITLE */

              new Paragraph({

                text:
                  "ATS Resume Analysis Report",

                heading:
                  HeadingLevel.TITLE,

                spacing: {
                  after: 300,
                },
              }),

              /* SCORE */

              new Paragraph({

                children: [

                  new TextRun({
                    text:
                      "ATS Compatibility Score: ",

                    bold: true,
                  }),

                  new TextRun({
                    text: `${data.atsScore}/100`,
                  }),
                ],

                spacing: {
                  after: 200,
                },
              }),

              /* SUMMARY */

              new Paragraph({

                text:
                  "Summary",

                heading:
                  HeadingLevel.HEADING_1,

                spacing: {
                  before: 300,
                  after: 120,
                },
              }),

              new Paragraph({

                text:
                  data.summary,

                spacing: {
                  after: 250,
                },
              }),

              /* SCORE BREAKDOWN */

              new Paragraph({

                text:
                  "Score Breakdown",

                heading:
                  HeadingLevel.HEADING_1,

                spacing: {
                  before: 300,
                  after: 180,
                },
              }),

              ...Object.entries(
                data.scoreBreakdown
              ).flatMap(
                ([key, value]) => [

                  new Paragraph({

                    children: [

                      new TextRun({
                        text: `${key.toUpperCase()} - `,
                        bold: true,
                      }),

                      new TextRun({
                        text: `${value.score}/100`,
                      }),
                    ],

                    spacing: {
                      after: 80,
                    },
                  }),

                  new Paragraph({

                    text:
                      value.feedback,

                    spacing: {
                      after: 180,
                    },
                  }),
                ]
              ),

              /* STRENGTHS */

              new Paragraph({

                text:
                  "Resume Strengths",

                heading:
                  HeadingLevel.HEADING_1,

                spacing: {
                  before: 300,
                  after: 180,
                },
              }),

              ...data.strengths.map(
                (strength) =>

                  new Paragraph({

                    text:
                      strength,

                    bullet: {
                      level: 0,
                    },

                    spacing: {
                      after: 100,
                    },
                  })
              ),

              /* SUGGESTIONS */

              new Paragraph({

                text:
                  "Improvement Suggestions",

                heading:
                  HeadingLevel.HEADING_1,

                spacing: {
                  before: 300,
                  after: 180,
                },
              }),

              ...data.suggestions.flatMap(
                (
                  suggestion
                ) => [

                  new Paragraph({

                    children: [

                      new TextRun({
                        text:
                          suggestion.category,

                        bold: true,
                      }),

                      new TextRun({
                        text: ` (${suggestion.priority.toUpperCase()} PRIORITY)`,
                      }),
                    ],

                    spacing: {
                      after: 120,
                    },
                  }),

                  new Paragraph({

                    children: [

                      new TextRun({
                        text:
                          "Issue: ",

                        bold: true,
                      }),

                      new TextRun({
                        text:
                          suggestion.issue,
                      }),
                    ],

                    spacing: {
                      after: 100,
                    },
                  }),

                  new Paragraph({

                    children: [

                      new TextRun({
                        text:
                          "Recommendation: ",

                        bold: true,
                      }),

                      new TextRun({
                        text:
                          suggestion.recommendation,
                      }),
                    ],

                    spacing: {
                      after: 220,
                    },
                  }),
                ]
              ),
            ],
          },
        ],
      })

    const blob =
      await Packer.toBlob(doc)

    saveAs(
      blob,
      "ATS-Resume-Analysis.docx"
    )
  }