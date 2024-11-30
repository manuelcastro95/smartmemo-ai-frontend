import React from 'react';
import MeetingItem from './MeetingItem';

const MeetingList = ({ meetings, onEdit, onRefresh, onViewDetail }) => {
  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <MeetingItem 
          key={meeting._id}
          meeting={meeting}
          onEdit={onEdit}
          onRefresh={onRefresh}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};

export default MeetingList; 