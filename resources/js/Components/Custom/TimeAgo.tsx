import React from "react";
import moment from "moment";

interface Props {
    createdAt?: string; // Masalan, '2024-06-17T10:00:00Z'
    updatedAt?: string; // Masalan, '2024-06-17T10:00:00Z'
}

const TimeAgo: React.FC<Props> = ({ createdAt, updatedAt }) => {
    // Moment.js yordamida vaqtni "1 minut oldin" kabi ko'rinishda formatlash
    const timeAgo = moment(createdAt).fromNow();
    const updatedTimeAgo = moment(updatedAt).fromNow();

    if (createdAt) {
        return <span>{timeAgo}</span>;
    }
    return <span>{updatedTimeAgo}</span>;
};

export default TimeAgo;
