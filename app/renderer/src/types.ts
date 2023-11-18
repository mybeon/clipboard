import type { ClipboardElement } from "../../electron/src/types";

export type ElectronAPI = {
    clearClipboard: () => void;
    getClipboard: () => Promise<ClipboardElement[]>;
    writeToClipboard: (text: string) => void;
};

export type Tab = {
    id: number;
    title: string;
    element: React.JSX.Element;
};

export declare const electronAPI: ElectronAPI;
