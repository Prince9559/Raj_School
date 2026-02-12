import React from "react";
import { UncontrolledCarousel } from "reactstrap"; // Assuming reactstrap is installed

const items = [
  {
    src: "/banner/10.jpg", // Use the public path directly if the image is in the public folder
    altText: "",
    caption: "",
    header: "",
  },{
    src: "/banner/11.jpg", // Use the public path directly if the image is in the public folder
    altText: "",
    caption: "",
    header: "",
  },{
    src: "/banner/9.jpg", // Use the public path directly if the image is in the public folder
    altText: "",
    caption: "",
    header: "",
  },
];

class Carousel extends React.Component {
  render() {
    return (
      <div>

      <div className="rounded shadow-lg overflow-hidden">
        <UncontrolledCarousel items={items} />
      </div>

      <div className="separator zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-white"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
      </div>
    );
  }
}

export default Carousel;
