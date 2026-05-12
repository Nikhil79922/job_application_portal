import api from "@/services/axios"

import type {
    RegisterPayload,
    RegisterResponse,
} from "../types/register.types"

const registerService = {

    register: async (
        payload: RegisterPayload
    ): Promise<RegisterResponse> => {

        const formData =
            new FormData()

        formData.append("name",payload.name)

        formData.append("email",payload.email)

        formData.append("password",payload.password)

        formData.append("phoneNumber",payload.phoneNumber)

        formData.append("role",payload.role)

        if (payload.bio) {
            formData.append("bio",payload.bio)
        }

        if (payload.file) {
            formData.append("file",payload.file)
        }

        const response =
            await api.post<
                RegisterResponse
            >(
                "/auth/register",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            )

        return response.data
    },
}

export default registerService