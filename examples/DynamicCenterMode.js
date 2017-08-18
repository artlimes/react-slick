import React, { Component } from 'react'
import Slider from '../src/slider'

export default class DynamicCenterMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [1, 2]
    };
  }

  render() {
    const settings = {
      className: 'dynamic-center-mode',
      centerMode: true,
      infinite: false,
      centerPadding: 0,
      slidesToShow: 13,
      variableWidth: true,
      slideHeight: 0.81,
      adaptiveHeight: true,
      speed: 500,
      afterChange: (index) => {
        const slides = this.state.slides;
        slides.push(slides.length + 1);

        this.setState({
          slides
        });
      }
    };
    return (
      <div>
        <h2>Dynamic Center Mode</h2>
        <Slider {...settings}>
          {this.state.slides.map(function (slide) {
            return <div key={slide}><h3>{slide}</h3></div>
          })}
        </Slider>
      </div>
    );
  }
}
