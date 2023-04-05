import React from 'react';
import NotifItemDiv from './NotifItemDiv';

const NotifItemLikePost = ({notif}) => {
    return (
        <div>
            <NotifItemDiv notif={notif}/>
        </div>
    );
}

export default NotifItemLikePost;
