import React from 'react';

const HorizontalMargin = ({margin, children}) => (
  <span
    style={{
      display: 'flex',
      width: typeof margin === 'string' ? margin : `${margin}px`,
    }}>
    {children}
  </span>
);

const VerticalMargin = ({margin, children}) => (
  <span
    style={{
      display: 'flex',
      height: typeof margin === 'string' ? margin : `${margin}px`,
    }}>
    {children}
  </span>
);

function Marginer(props) {
  const {direction = 'horizontal'} = props;

  if (direction === 'horizontal') return <HorizontalMargin {...props} />;
  else {
    return <VerticalMargin {...props} />;
  }
}

export default Marginer;
