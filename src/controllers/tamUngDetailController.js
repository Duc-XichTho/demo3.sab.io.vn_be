import {
    createTamUngDetailService,
    updateTamUngDetailService,
    getAllTamUngDetailByTamUngIdService,
    hideTamUngDetailService
} from "../services/tamUngDetailService.js";

export const getAllTamUngDetailByTamUngIdController = async (req, res) => {
    try {
        const data = await getAllTamUngDetailByTamUngIdService(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi khi lấy danh sách bản ghi TamUngDetail: ' + error.message,
        });
    }
};

export const createTamUngDetailController = async (req, res) => {
    const data = req.body;
    try {
        const team = await createTamUngDetailService(data);
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo bản ghi TamUngDetail: ' + error.message });
    }
};


export const updateTamUngDetailController = async (req, res) => {
    const data = req.body;
    try {
        const team = await updateTamUngDetailService(data);
        res.status(200).json(team);
    } catch (error) {
        res.status(404).json({
            message: 'Bản ghi không tồn tại hoặc lỗi khi cập nhật: ' + error.message,
        });
    }
};

export const deleteTamUngDetailController = async (req, res) => {
    let ids = req.params.id;
    if (!Array.isArray(ids)) {
        ids = [ids];
    }

    if (ids.length === 0) {
        return res.status(400).json({ message: 'Yêu cầu không hợp lệ: cần một hoặc nhiều ID.' });
    }

    try {
        const result = await hideTamUngDetailService(ids);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({
            message: 'Bản ghi TamUngDetail không tồn tại hoặc lỗi khi xóa: ' + error.message,
        });
    }
};
