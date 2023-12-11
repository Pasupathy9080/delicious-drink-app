import React from 'react';
import { Container } from 'reactstrap';
import { FcRating } from 'react-icons/fc';

function Stars(props) {
    return (
        <Container>
            <div className="rating-container">     
                <p className='text-success'><FcRating className="rating-icon fs-4" /> {props.rating}</p>
            </div>
            <p className='text-muted'>{props.text}</p>
        </Container>
    )
}

export default Stars;
