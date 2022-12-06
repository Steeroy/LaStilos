import React from 'react';

function Helmet(props) {
  document.title = 'La Stilos - ' + props.title;
  return <div className="w-100">{props.children}</div>;
}

export default Helmet;
