import axios from 'axios';
import dotenv from 'dotenv';
import {ChatHistoryFile, ExternalChatHistory} from "../../postgres/postgres.js";

dotenv.config();

export async function processQuestion(question, email, timeAsk) {
    try {
        const response = await axios.post(
            `${process.env.DPAS_SERVICE_BASE_URL}/services/qa/ask`,
            {
                question,
                email,
                timeAsk,
                serviceName: process.env.SERVICE_NAME
            },
            {
                headers: {
                    'x-api-secret': process.env.INTERNAL_API_SECRET
                }
            }
        );
        const success = response.data?.success;
        if (success) {
            await ExternalChatHistory.create(response.data.data);
        }
        // Trả về kết quả từ service A (nếu cần)
        return response.data;
    } catch (error) {
        console.error('Error calling /qa/ask from service A:', error.response?.data || error.message);
        throw new Error('Failed to process question with service A');
    }
}

export async function processQuestionWithSources(question, email, timeAsk, sourceIds) {
    try {
        const response = await axios.post(
            `${process.env.DPAS_SERVICE_BASE_URL}/services/ask-with-sources`,
            {
                question,
                email,
                timeAsk,
                sourceIds,
                serviceName: process.env.SERVICE_NAME
            },
            {
                headers: {
                    'x-api-secret': process.env.INTERNAL_API_SECRET
                }
            }
        );
        const success = response.data?.success;
        if (success) {
            await ExternalChatHistory.create(response.data.data);
        }

        // Trả về kết quả từ service A (nếu cần)
        return response.data;
    } catch (error) {
        console.error('Error calling /qa/ask from service A:', error.response?.data || error.message);
        throw new Error('Failed to process question with service A');
    }
}

export async function processQuestionWithSourcesOne(question, email, timeAsk, sourceIds, systemMessage, template,
) {
    try {
        const response = await axios.post(
            `${process.env.DPAS_SERVICE_BASE_URL}/services/ask-with-sources`,
            {
                question,
                email,
                timeAsk,
                sourceIds,
                serviceName: process.env.SERVICE_NAME,
                systemMessage,
                template,
            },
            {
                headers: {
                    'x-api-secret': process.env.INTERNAL_API_SECRET
                }
            }
        );
        const success = response.data?.success;
        if (success) {
            const dataToSave = {
                ...response.data.data,
                id_file: sourceIds
            };

            await ChatHistoryFile.create(dataToSave);
        }

        // Trả về kết quả từ service A (nếu cần)
        return response.data;
    } catch (error) {
        console.error('Error calling /qa/ask from service A:', error.response?.data || error.message);
        throw new Error('Failed to process question with service A');
    }
}


export async function embedDataFile(data) {
    try {
        const response = await axios.post(
            `${process.env.DPAS_SERVICE_BASE_URL}/services/embed`,
            {
                ids: data, // giả sử `data` là mảng id
                serviceName: process.env.SERVICE_NAME
            },
            {
                headers: {
                    'x-api-secret': process.env.INTERNAL_API_SECRET
                }
            }
        );
        // Trả về kết quả từ service A (nếu cần)
        return response.data;
    } catch (error) {
        console.error('Error calling /embed from service A:', error.response?.data || error.message);
        throw new Error('Failed to process question with service A');
    }
}

export async function deleteEmbedDataFile(data) {
    try {
        const response = await axios.post(
            `${process.env.DPAS_SERVICE_BASE_URL}/services/external-embeddings`,
            {
                sourceIds: data, // giả sử `data` là mảng id
                serviceName: process.env.SERVICE_NAME
            },
            {
                headers: {
                    'x-api-secret': process.env.INTERNAL_API_SECRET
                }
            }
        );
        // Trả về kết quả từ service A (nếu cần)
        return response.data;
    } catch (error) {
        console.error('Error calling /embed from service A:', error.response?.data || error.message);
        throw new Error('Failed to process question with service A');
    }
}
