import * as React from 'react';
import { Post } from '../actions';
import './PostItem.css';

interface Props {
    post: Post;
    location: any;
}

export const PostItem: React.SFC<Props> = props => {
    let title: any | JSX.Element = props.post.owner.login,
        imgPath: any | JSX.Element = props.post.owner.avatar_url,
        urlProfile: any | JSX.Element = props.post.owner.html_url,
        description: string | JSX.Element = props.post.description.substring(0, 200),
        starcount: any | JSX.Element = props.post.stargazers_count,
        location: any | JSX.Element = localStorage.getItem('CityName') || props.location,
        fullName: any | JSX.Element = props.post.full_name;

    return (
        <div className="post">
            <p><img src={imgPath} className="imgSize"/>
                <span><strong>{title}</strong> </span> &nbsp;
                <a target="_blank" href={urlProfile}>{fullName}</a>
                <img src="star.svg" className="imgStarSize"/>&nbsp;<span>{starcount}</span>
                <br/> <br/>
                <span>{description}</span>
                <br/>
                <span className="location">location:<img src="location.png" className="imgLoactionSize"/>&nbsp;
                    <span>{location}</span></span>

            </p>
        </div>
    );
};
