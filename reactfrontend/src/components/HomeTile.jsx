import React from 'react';
import { Link } from 'react-router-dom';
import GalleryTile from '../components/GalleryTile';

function HomeTile(page) {
  return (
    <>
      {page && page.name === 'Gallery' ? (
        <GalleryTile to={page.to}/>
        ) : (
        <Link className={`${page.name} tile midBlue`} to={page.to} style={{ textDecoration: 'none' }}>
          <div style={{ cursor: 'pointer' }}>
            <h1>{page.name}</h1>
          </div>
        </Link>)
      }
    </>
  );  
}

export default HomeTile