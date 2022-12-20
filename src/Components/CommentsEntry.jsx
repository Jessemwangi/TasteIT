import React from 'react';
import { Button } from 'reactstrap';

const CommentsEntry = ({AddCommentHandler,commetEntry,inputs}) => {
   console.log(inputs);
   
    const selectR = 6;
    let SelOption = []
    for (let i = 0; i < selectR; i++) {
        SelOption.push(<option value={i} key={i}>{i}</option>)
    }
    return (
        <div>
            <form id='formEntry' onSubmit={AddCommentHandler} onChange={commetEntry}>
            <div>
                <label htmlFor="selectRate">Rate Recipe</label>
            <select name="rating" id="selectRate" className='selectRate' onChange={commetEntry}>
                {SelOption}
            </select>
            <label htmlFor="sendBy">Full Names</label>
            <input value={inputs.sendBy} type="text" name="sendBy" id="sendBy" 
            className='sendBy' onChange={commetEntry} required/>
            </div>

            <textarea value={inputs.message} className='commentText' name="message" id="message" cols="30" rows="10" placeholder='message' onChange={commetEntry} required></textarea>
            <button type='submit' onClick={AddCommentHandler}>Add comment</button>
            </form>
             </div>
    );
};

export default CommentsEntry;