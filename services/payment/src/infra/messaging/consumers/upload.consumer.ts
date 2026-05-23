// kafka/upload.consumer.ts

import { kafka } from "../../../config/kafka.config.js"
import { uploadToCloudinary } from "../../../services/upload.service.js"

import { PostgresCompaniesRepository } from "../../database/repository/companies.repository.js"
import { PostgresUserRepository } from "../../database/repository/user.repository.js"

const userRepo=new PostgresUserRepository()

const companyRepo=new PostgresCompaniesRepository()

export const startUploadConsumer=async()=>{

  const consumer=kafka.consumer({
    groupId:"upload-group",
  })

  await consumer.connect()

  await consumer.subscribe({
    topic:"upload-content",
    fromBeginning:false,
  })

  console.log(
    "📥 Upload consumer started"
  )

  await consumer.run({

    eachMessage:async({
      partition,
      message,
    })=>{

      let payload:any

      try{

        try{

          payload=JSON.parse(
            message.value?.toString()||
            "{}"
          )

        }catch{

          console.log(
            "❌ Invalid JSON"
          )

          return
        }

        const {
          entityId,
          file,
          mimeType,
          public_id,
          entityType,
          uploadType,
        }=payload

        if(
          !entityId||
          !file||
          !mimeType||
          !entityType||
          !uploadType
        ){

          console.log(
            "⚠️ Invalid payload",
            payload
          )

          return
        }

        console.log(
          `📦 [P${partition}] ${entityType}:${uploadType} | ID ${entityId}`
        )

        const dataUri=
          `data:${mimeType};base64,${file}`

        const result=
          await uploadToCloudinary(
            dataUri,
            public_id
          )

        console.log(
          `☁️ Uploaded → ${result.url}`
        )

        const handlers:
          Record<
            string,
            ()=>Promise<void>
          >={

          "user:resume":
            async()=>{

              await userRepo.update(
                entityId,
                {
                  resume:
                    result.url,

                  resume_public_id:
                    result.public_id,

                  resume_upload_status:
                    "success",
                }
              )
            },

          "company:logo":
            async()=>{

              await companyRepo.update(
                entityId,
                {
                  logo:
                    result.url,

                  logo_public_id:
                    result.public_id,

                  logo_upload_status:
                    "success",
                }
              )
            },

          "user:profile_pic":
            async()=>{

              await userRepo.update(
                entityId,
                {
                  profile_pic:
                    result.url,

                  profile_pic_public_id:
                    result.public_id,

                  profile_pic_upload_status:
                    "success",
                }
              )
            },
        }

        const key=
          `${entityType}:${uploadType}`

        if(!handlers[key]){

          console.log(
            "⚠️ No handler found for:",
            key
          )

          if(
            entityType==="user"
          ){

            if(
              uploadType==="resume"
            ){

              await userRepo.update(
                entityId,
                {
                  resume_upload_status:
                    "fail",
                }
              )
            }

            if(
              uploadType==="profile_pic"
            ){

              await userRepo.update(
                entityId,
                {
                  profile_pic_upload_status:
                    "fail",
                }
              )
            }
          }

          if(
            entityType==="company"
          ){

            if(
              uploadType==="logo"
            ){

              await companyRepo.update(
                entityId,
                {
                  logo_upload_status:
                    "fail",
                }
              )
            }
          }

          return
        }

        await handlers[key]()

        console.log(
          `✅ Upload + DB updated (${key})`
        )

      }catch(err:any){

        console.error(
          "❌ Upload failed:",
          err.message
        )

        try{

          if(
            payload?.entityType==="user"
          ){

            if(
              payload?.uploadType==="resume"
            ){

              await userRepo.update(
                payload.entityId,
                {
                  resume_upload_status:
                    "fail",
                }
              )
            }

            if(
              payload?.uploadType==="profile_pic"
            ){

              await userRepo.update(
                payload.entityId,
                {
                  profile_pic_upload_status:
                    "fail",
                }
              )
            }
          }

          if(
            payload?.entityType==="company"
          ){

            if(
              payload?.uploadType==="logo"
            ){

              await companyRepo.update(
                payload.entityId,
                {
                  logo_upload_status:
                    "fail",
                }
              )
            }
          }

          console.log(
            "⚠️ Failure status updated in DB"
          )

        }catch(dbErr){

          console.error(
            "❌ DB update failed",
            dbErr
          )
        }
      }
    },
  })
}