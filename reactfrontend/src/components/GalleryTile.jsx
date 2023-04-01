import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

const GalleryTile = (page) => {
  //const images = useSelector((state) => state.images);
  const localImages = ['kingdom-hearts.jpg', 'Limitless-Model.webp', 'space.jpg'];

  return (
    // <div>
    //   {images && images.length > 0 && (
    //     <Carousel dynamicHeight showStatus={false} showThumbs={false}>
    //       {images.map((image) => (
    //         <div key={image}>
    //           <img src={`/uploads/${image}`} alt={image} />
    //         </div>
    //       ))}
    //     </Carousel>
    //   )}
    // </div>
      // <div className='tile midBlue'>
      <>
          {localImages.length > 0 && (
              <Carousel
                className='Gallery'
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                autoPlay={true}
                infiniteLoop={true}
                style={{
                  position: 'absolute', // Add this line for absolute positioning
                  top: 0, // Add this line to position the carousel
                  left: 0, // Add this line to position the carousel
                  width: '100%',
                  height: '100%',
                }}
              >               
                {localImages.map((image) => (
                  <Link to={page.to} style={{ textDecoration: 'none',  width: '100%', height: '100%' }}> {/*Link to gallery*/}
                    <div className="galleryLink" key={image}>
                      {/* Use process.env.PUBLIC_URL to reference the public folder */}
                        <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt={image} />
                    </div>
                  </Link>
                ))}
              </Carousel>
          )}
          </>
      // </div>
  );
};

export default GalleryTile;
