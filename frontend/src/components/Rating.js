import React from 'react';
import { Icon } from '@iconify/react';
import '../App.css';

function Rating(props) {
  const { rating } = props;

  return (
    <div className="rating">
      <span>
        {rating >= 1 ? (
          <Icon icon="ic:outline-star-purple500" />
        ) : rating >= 0.5 ? (
          <Icon icon="ic:outline-star-half" />
        ) : (
          <Icon icon="ic:outline-star-border-purple500" />
        )}
      </span>
      <span>
        {rating >= 2 ? (
          <Icon icon="ic:outline-star-purple500" />
        ) : rating >= 1.5 ? (
          <Icon icon="ic:outline-star-half" />
        ) : (
          <Icon icon="ic:outline-star-border-purple500" />
        )}
      </span>
      <span>
        {rating >= 3 ? (
          <Icon icon="ic:outline-star-purple500" />
        ) : rating >= 2.5 ? (
          <Icon icon="ic:outline-star-half" />
        ) : (
          <Icon icon="ic:outline-star-border-purple500" />
        )}
      </span>
      <span>
        {rating >= 4 ? (
          <Icon icon="ic:outline-star-purple500" />
        ) : rating >= 3.5 ? (
          <Icon icon="ic:outline-star-half" />
        ) : (
          <Icon icon="ic:outline-star-border-purple500" />
        )}
      </span>
      <span>
        {rating >= 5 ? (
          <Icon icon="ic:outline-star-purple500" />
        ) : rating >= 4.5 ? (
          <Icon icon="ic:outline-star-half" />
        ) : (
          <Icon icon="ic:outline-star-border-purple500" />
        )}
      </span>
    </div>
  );
}

export default Rating;
