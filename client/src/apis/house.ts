import axios from "axios";
import { House } from "../types/House";

export const addHouse = (house: Omit<House,"id" | "risk">) => {
    return axios.post("/api/houses", { ...house })
        .then(res => {
            if (res.data.success) {
                return res.data.houseId
            }
            else {
                return Promise.reject();
            }
        });
}
export const getHouse = (houseId: number) => {
    return axios.get(`/api/houses/${houseId}`)
        .then(res => {
            if (res.data.success) {
                return res.data.house;
            }
            else {
                return Promise.reject(res.data.error);
            }
        });
}

export const updateHouse = (houseId: number, currentValue: number, loanAmount: number) => {
    return axios.put(`/api/houses/${houseId}`, { id: houseId, currentValue, loanAmount })
        .then(res => {
            if (res.data.success) {
                const { success, ...house } = res.data;
                return house;
            }
            else {
                return Promise.reject(res.data.error);
            }
        });
}