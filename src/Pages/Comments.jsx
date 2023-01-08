import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'reactstrap';
import { RiStarFill } from 'react-icons/ri';

import './Comments.css';
import { useGet_one_recipe } from '../DataLayer/GetRecipe';

const Comments = ({ RcpId }) => {
    const {response} =useGet_one_recipe('comments','recipeId',RcpId);

    const [isloading, setIsloading] = useState(true);
    const [comments, setComments] = useState(response);


    useEffect(() => {
        setIsloading(true);
        if (response !== null && response.length > 0){
            setIsloading(false);
            setComments(response)
        }
      }, [RcpId,response]);
console.log(comments);

    const getRatings = (rates) => {
        let star = [];
        for (let i = 0; i < rates; i++) {
            star.push(<RiStarFill key={Math.random()} />)
        }
        return star;
    }

    const fixDate = (dateTime) => {
        let dateToFix = new Date(dateTime);
        let now = new Date();
        let diff = (now.getTime() - dateToFix.getTime()).toFixed(4);
        let sec = (diff / 60000).toFixed(0);
        let minutes = Math.round(((diff % 86400000) % 3600000) / 60000)
        let hrs = Math.floor((diff % 86400000) / 3600000)
        let days = Math.floor(diff / 86400000);

        if (days >= 30 && days <= 60) {
            return `Posted  ${days} Days and ${hrs} Hours Ago, Less than 3 month `;
        }
        else if (days > 14) {
            return `Posted ${days} Days and ${hrs} Hours Ago,  Less than a month`;
        }
        else if (days > 7) {
            return `Posted ${days} Days Ago, almost weeks`;
        }
        else if (days > 0) {
            return `Posted ${days} Days Ago, within this week.`;
        }
        else if (hrs > 0) {
            return `Posetd  ${hrs} Hours  Ago`;
        }
        else if (minutes > 0) {
            return `posted ${minutes} Minutes Ago.`;
        }
        else if (sec > 0) {
            return `posted ${sec} Seonds Ago.`;
        }
        else { return `Posted on ${dateToFix}` }

    };

    return (
       
        isloading ? (
            <Spinner animation="grow" variant="light"></Spinner>
        )
            :
            (
               
                comments.length > 0 ?
               
                    (

                        <div className="mainComment">
 
                            <div className="comments-container">

                                <div className='ul'>
                                    {comments.map(comment =>
                                        <div className='li' key={comment.id} >
                                            <div className="comment-main-level">

                                                <div className="comment-avatar">
                                                    <img src="https://cdn-icons-png.flaticon.com/512/843/843260.png" alt="chef works" />
                                                </div>

                                                <div className="comment-box">
                                                    <div className="comment-head">
                                                        <h6 className="comment-name by-author">{comment.sendBy}</h6>
                                                        <span> {fixDate(comment.date)}</span>
                                                        {getRatings(comment.rating)
                                                        }
                                                        <i className="fa fa-reply"></i>
                                                        <i className="fa fa-heart"></i>
                                                    </div>
                                                    <div className="comment-content">
                                                        <p>{comment.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                    : 
                    (
                        <Container className='bg-light p-3' fluid="fluid">
                            <span className='noReview'>No Review have been left for this Recipe; be the first to leave a Review</span>
                        </Container>

                    )
            )
    )
};

export default Comments;