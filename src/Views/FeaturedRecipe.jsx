import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';

const FeaturedRecipe = (featured) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const items = featured.featuredRecipe;

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item, index) => {
        let caption = 
            <div className='caCaption'>
                <div className='crInfo'>
                    <h4>Summary</h4>
                    <p>- Author : {item.author},</p>
                    <p>- Country : {item.country?.name}</p>
                    <p>- Total  Ingridients : {item.ingredients.length} ,</p>
                    <p>- Total Steps : {item.steps.length}</p>
                </div>
                <div className='ingridContents'>
                    <h4>Ingridients</h4>
                    <div className='ingridList'><ol>
                        {item.ingredients.map(ingrid => <li key={ingrid.ingredientId}>{ingrid.name}</li>)}
                    </ol>
                    </div>
                </div>
            </div>
        return (
            <CarouselItem
                className="custom-tag"
                tag="div"
                key={index}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <img src={`https://source.unsplash.com/1020x400/?${item.name}`} alt={item.altText} />
                <CarouselCaption
                    className="text-danger"
                    captionText={caption}
                    captionHeader={item.name}
                />
            </CarouselItem>
        );
    });
    return (
        <>
            <style>
                {`.custom-tag {
                      max-width: 100%;
                      height: 350px;
                      background: black;
                    }`}
            </style>

            <Carousel activeIndex={activeIndex} next={next} previous={previous} className='mb-3'>
                <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                />
                {slides}
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                />
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                />
            </Carousel>
        </>
    );
};

export default FeaturedRecipe;