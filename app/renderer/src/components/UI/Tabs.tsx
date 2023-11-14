import { motion } from "framer-motion";
import React, { useState } from "react";
import type { Tab as TabType } from "../../types";
import Tab from "./Tab";

type Props = {
    children?: React.ReactNode;
    data: TabType[];
};

const Tabs = (props: Props) => {
    const [activeTab, setActiveTab] = useState(props.data[0]);

    function onSetActiveTabHandler(index: number) {
        setActiveTab(props.data[index]);
    }

    return (
        <div className="tab-wrapper">
            <div className="upper-section">
                {props.data.map((tab, index) => (
                    <Tab
                        key={index}
                        title={tab.title}
                        index={index}
                        isActive={activeTab.id === index}
                        onSetActiveTab={onSetActiveTabHandler}
                    />
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                key={activeTab.id}
            >
                {activeTab.element}
            </motion.div>
        </div>
    );
};

export default Tabs;
