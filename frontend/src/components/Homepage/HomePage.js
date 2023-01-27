import React, { useState, useEffect, Fragment } from "react";
import ImageGallery from "react-image-gallery";
import { getListings, clearListings } from "../../actions/listing";
import { connect } from "react-redux";
import ListingCard from "../Listing/ListingCard";
import Spinner from "./../Layout/Spinner";

export const HomePage = ({ getListings, clearListings, listings }) => {
  const [imageLoadedCount, setCount] = useState(1);
  const [imagesLoading, setImagesLoading] = useState(true);
  const images = [
    {
      original:
        "https://www.ellementry.com/blog/wp-content/uploads/2021/07/4-6.jpg",
    },
    {
      original:
        "https://imageengine.victorinox.com/medias/?context=bWFzdGVyfHJvb3R8OTc5NDF8aW1hZ2UvanBlZ3xoMjkvaGQ4LzEzNTE5MTQyNzQ4MTkwL25hdi1jYXJwZXQtd2F0LW1hdmVyaWNrLTY0MHgzNTAuanBnfDU1OGRlNzRmNjE5ZGEzNWI3MjlhN2I3ZWYxNmYzNzZhNDM0MGIwZDI4YTdmZjM0NTVlN2YwNDVlOWRiZTE1YjM",
    },
    {
      original:
        "https://media.istockphoto.com/id/593316396/photo/old-gramophone-and-other-antique-objects-at-antiques-market.jpg?b=1&s=170667a&w=0&k=20&c=KO_X_rCsHIvsCYHBwhRUjqguOsbQLVP3QCnPdQkfx-k=",
    },
  ];

  const handleImageLoad = () => {
    setCount(imageLoadedCount + 1);
    if (imageLoadedCount === 3) {
      console.log("loaded");
      setImagesLoading(false);
    }
  };

  useEffect(() => {
    getListings("?limit=5");
    return () => {
      clearListings();
    };
  }, [getListings, clearListings]);

  return listings.loading || listings.data === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {imagesLoading && <Spinner />}
      <div
        style={{ display: imagesLoading ? "none" : "block" }}
        className="row"
      >
        <ImageGallery
          showThumbnails={false}
          onImageLoad={handleImageLoad}
          items={images}
        />
        <div className="listing-card-row">
          <h2 className="large-heading">More Items to consider</h2>
          {listings.data.map((listing) => (
            <ListingCard id={listing._id} listing={listing} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  listings: state.listings,
});

export default connect(mapStateToProps, { clearListings, getListings })(
  HomePage
);
