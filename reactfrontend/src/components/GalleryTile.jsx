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
      <div className='tile'>
          {localImages.length > 0 && (
              <Carousel showStatus={false} showThumbs={false}>
                  {localImages.map((image) => (
                    <Link to={page.to} style={{ textDecoration: 'none' }}> {/*Link to gallery*/}
                      <div className="galleryLink" key={image}>
                        {/* Use process.env.PUBLIC_URL to reference the public folder */}
                          <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt={image} />
                      </div>
                    </Link>
                  ))}
              </Carousel>
          )}
      </div>
  );
};

export default GalleryTile;
