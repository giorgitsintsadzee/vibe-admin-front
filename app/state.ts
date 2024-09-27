import { atom } from "recoil";

export const clickState = atom<boolean>({
    key: 'click',
    default: false
})