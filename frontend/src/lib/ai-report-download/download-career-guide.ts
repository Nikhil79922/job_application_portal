import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
  } from "docx"
  
  import { saveAs } from "file-saver"
  
  import {
    CareerGuidanceResponse,
  } from "@/types/utils/AIservice.types"
  
  export const downloadCareerGuide = async (
    data: CareerGuidanceResponse
  ) => {
  
    const doc = new Document({
  
      sections: [
        {
          properties: {},
  
          children: [
  
            /* TITLE */
  
            new Paragraph({
              text: "AI Career Guidance Report",
  
              heading:
                HeadingLevel.TITLE,
  
              alignment:
                AlignmentType.CENTER,
  
              spacing: {
                after: 400,
              },
            }),
  
            /* SUMMARY */
  
            new Paragraph({
              text: "Professional Summary",
  
              heading:
                HeadingLevel.HEADING_1,
  
              spacing: {
                before: 300,
                after: 180,
              },
            }),
  
            new Paragraph({
              children: [
                new TextRun({
                  text: data.summary,
                  size: 24,
                }),
              ],
  
              spacing: {
                after: 280,
              },
            }),
  
            /* JOB OPTIONS */
  
            new Paragraph({
              text:
                "Recommended Career Roles",
  
              heading:
                HeadingLevel.HEADING_1,
  
              spacing: {
                before: 300,
                after: 180,
              },
            }),
  
            ...data.jobOptions.flatMap(
              (job, index) => [
  
                new Paragraph({
                  text:
                    `${index + 1}. ${job.title}`,
  
                  heading:
                    HeadingLevel.HEADING_2,
  
                  spacing: {
                    before: 200,
                    after: 120,
                  },
                }),
  
                new Paragraph({
                  children: [
  
                    new TextRun({
                      text:
                        "Responsibilities: ",
                      bold: true,
                    }),
  
                    new TextRun({
                      text:
                        job.responsibilities,
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
                        "Why This Role Fits: ",
                      bold: true,
                    }),
  
                    new TextRun({
                      text: job.why,
                    }),
                  ],
  
                  spacing: {
                    after: 180,
                  },
                }),
              ]
            ),
  
            /* SKILLS */
  
            new Paragraph({
              text: "Skills To Learn",
  
              heading:
                HeadingLevel.HEADING_1,
  
              spacing: {
                before: 300,
                after: 180,
              },
            }),
  
            ...data.skillsToLearn.flatMap(
              (category) => [
  
                new Paragraph({
                  text:
                    category.category,
  
                  heading:
                    HeadingLevel.HEADING_2,
  
                  spacing: {
                    before: 220,
                    after: 120,
                  },
                }),
  
                ...category.skills.flatMap(
                  (skill) => [
  
                    new Paragraph({
                      children: [
  
                        new TextRun({
                          text:
                            skill.title,
                          bold: true,
                        }),
                      ],
                    }),
  
                    new Paragraph({
                      children: [
  
                        new TextRun({
                          text:
                            "Why: ",
                          bold: true,
                        }),
  
                        new TextRun({
                          text:
                            skill.why,
                        }),
                      ],
  
                      spacing: {
                        after: 80,
                      },
                    }),
  
                    new Paragraph({
                      children: [
  
                        new TextRun({
                          text:
                            "How To Learn: ",
                          bold: true,
                        }),
  
                        new TextRun({
                          text:
                            skill.how,
                        }),
                      ],
  
                      spacing: {
                        after: 160,
                      },
                    }),
                  ]
                ),
              ]
            ),
  
            /* LEARNING APPROACH */
  
            new Paragraph({
              text:
                data.learningApproach.title,
  
              heading:
                HeadingLevel.HEADING_1,
  
              spacing: {
                before: 300,
                after: 180,
              },
            }),
  
            ...data.learningApproach.points.map(
              (point) =>
  
                new Paragraph({
                  text: point,
  
                  bullet: {
                    level: 0,
                  },
  
                  spacing: {
                    after: 100,
                  },
                })
            ),
          ],
        },
      ],
    })
  
    const blob =
      await Packer.toBlob(doc)
  
    saveAs(
      blob,
      "AI-Career-Guidance.docx"
    )
  }