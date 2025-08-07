import React from 'react'
import Header from '../Header/Header'
import Carousel from 'react-bootstrap/Carousel';

import myImage from '../../../assessts/istockphoto.jpg';
import './HomePage.css'


const HomePage = () => {
    return (
        <div className="home-page">
            <Header />
            <div className='homepage-container'>
                <div className='carousel-container'>
                    <Carousel>
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100 carousel-image"
                                src={myImage}
                                alt='First slide'
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={500}>
                            <img
                                className="d-block w-100 carousel-image"
                                src={myImage}
                                alt='Second slide'
                            />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-image"
                                src={myImage}
                                alt='Third slide'
                            />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
