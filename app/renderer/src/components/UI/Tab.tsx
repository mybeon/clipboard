import React from "react";

type Props = {
    children?: React.ReactNode;
    title: string;
    isActive: boolean;
    index: number;
    onSetActiveTab: (index: number) => void;
};

const Tab = (props: Props) => {
    function setActiveTab() {
        props.onSetActiveTab(props.index);
    }

    return (
        <div
            key={props.index}
            className="tab-title"
            style={{ opacity: props.isActive ? 1 : 0.5 }}
            onClick={setActiveTab}
        >
            {props.title}
            {props.isActive && <div className="is-active"></div>}
        </div>
    );
};

export default Tab;
