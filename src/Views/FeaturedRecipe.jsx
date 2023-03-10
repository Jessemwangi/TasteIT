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
        let caption = `Posted By ${item.author} :  Total  Ingridients : ${item.ingredients.length}, with Total Steps : ${item.steps.length}`
       
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
        <div>
            <style>
                {`.custom-tag {
                      max-width: 100%;
                      height: 350px;
                      background: black;
                    }`}
            </style>

            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
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
        </div>
    );
};

export default FeaturedRecipe;