import React from "react";
import { Tab as TabType } from "../../types";
import Tabs from "../UI/Tabs";
import Local from "./Local";
import Shared from "./Shared";

const tabsData: TabType[] = [
    { id: 0, title: "local", element: <Local /> },
    { id: 1, title: "shared", element: <Shared /> },
];

const List = () => {
    return <Tabs data={tabsData} />;
};

export default List;
