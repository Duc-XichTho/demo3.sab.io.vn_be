import {FileNotePad, FileTab, ReportCanvas} from "../postgres/postgres.js";

export const getAllFileTabTypeDataService = async () => {
    try {
        const fileTabs = await FileTab.findAll({
            where: {show: true},
            raw: true,
            type: "data",
        });

        const result = await Promise.all(
            fileTabs.map(async (tab) => {
                const notes = await FileNotePad.findAll({
                    where: {
                        tab: tab.key,
                        show: true
                    },
                    raw: true,
                });
                return {
                    ...tab,
                    listFileNote: notes,
                };
            })
        );
        return result;
    } catch (error) {
        throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
}

;export const getAllFileTabService = async () => {
    try {
        const fileTabs = await FileTab.findAll({
            where: {show: true},
            raw: true,
        });

        const result = await Promise.all(
            fileTabs.map(async (tab) => {
                const notes = await FileNotePad.findAll({
                    where: {
                        tab: tab.key,
                        show: true
                    },
                    raw: true,
                });
                return {
                    ...tab,
                    listFileNote: notes,
                };
            })
        );
        return result;
    } catch (error) {
        throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
    }
};

export const getFileTabByTypeService = async (table, type) => {
        let model = null;
        let noteWhere = {};
        let fileTabs = [];
        try {
            if (type == 'data') {
                fileTabs = await FileTab.findAll({
                    where: {
                        show: true,
                        type: type,
                        table: table
                    },
                    raw: true,
                });
                model = FileNotePad;
                noteWhere = {table: 'Template'};
            } else if (type == 'dashboard') {
                fileTabs = await FileTab.findAll({
                    where: {
                        show: true,
                        type: type,
                    },
                    raw: true,
                });
                model = ReportCanvas;
            } else {
                return fileTabs;
            }

            const result = await Promise.all(
                fileTabs.map(async (tab) => {
                    const notes = await model.findAll({
                        where: {
                            tab: tab.key,
                            show: true,
                            ...noteWhere,
                        },
                        order: [['id', 'DESC']],
                        raw: true,
                    });

                    return {
                        ...tab,
                        listFileNote: notes,
                    };
                })
            );
            return result;
        } catch
            (error) {
            throw new Error("Lỗi khi lấy dữ liệu: " + error.message);
        }
    }
;


// CREATE
export const createFileTabService = async (data) => {
    try {
        const result = await FileTab.create(data);
        return result;
    } catch (error) {
        throw new Error("Lỗi khi tạo bản ghi File Tab: " + error.message);
    }
};

// UPDATE
export const updateFileTabService = async (data) => {
    try {
        const {id} = data;
        const fileTab = await FileTab.findByPk(id);
        if (!fileTab) {
            throw new Error("Bản ghi file tab không tồn tại");
        }
        await fileTab.update(data);
        return fileTab;
    } catch (error) {
        throw new Error("Lỗi khi cập nhật bản ghi File tab: " + error.message);
    }
};

// DELETE
export const deleteFileTabService = async (id) => {
    try {
        const fileTab = await FileTab.findByPk(id);
        if (!fileTab) {
            throw new Error("Bản ghi file tab không tồn tại");
        }
        await fileTab.update({show: false});
        return {message: "Xóa file tab thành công"};
    } catch (error) {
        throw new Error("Lỗi khi xóa bản ghi File tab: " + error.message);
    }
};
