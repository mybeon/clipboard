import type { ClipboardElement } from "../../types";

export type ElectronAPI = {
    clearClipboard: () => void;
    getClipboard: () => Promise<ClipboardElement[]>;
    writeToClipboard: (text: string) => void;
};

export declare const electronAPI: ElectronAPI;
