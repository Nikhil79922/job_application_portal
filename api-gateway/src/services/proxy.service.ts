import axios from "axios";

export const proxyRequest = async (req: any, reply: any, target: string) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${target}${req.url}`,
            data: req.body,
            headers: {
                ...req.headers,
            },
            transformRequest: [(data) => data],
        });
        return response.data;
    } catch (error: any) {
        console.error(" PROXY ERROR ::: ", error?.response?.data || error.message);

        if (error.response) {
            return reply
                .status(error.response.status)
                .send(error.response.data);
        }
        return reply.status(500).send({
            success: false,
            message: "Internal Server Error",
        });
    }
};