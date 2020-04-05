import React from 'react';
import {withRouter} from 'react-router-dom'

import './menu-item.style.scss'

const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (
    <div className={`menu-item ${size}`}>
        <div className='background-image'
            style={{backgroundImage: `url(${imageUrl})`}}
            onClick={()=> history.push(`${match.url}${linkUrl}`)}
        >
        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
        </div>
    </div>
)

export default withRouter(MenuItem);