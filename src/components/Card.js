import React from 'react';

function Card(props) {
    function handleClick() {
        props.onImageClick(props.element);
    }
    return (
        <>
            <img
                className="element__image"
                src={props.element.link}
                alt={props.element.name}
                onClick={handleClick} />
            <button className="element__trash"></button>
            <div className="element__element-container">
                <h2 className="element__text">{props.element.name}</h2>
                <button aria-label="нравится" className="element__btn" type="button"></button>
                <span className="element__likeNamber">{props.element.likes.length}</span>
            </div>
        </>
    )
}
export default Card;
