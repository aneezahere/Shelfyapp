import React from 'react';

const InventoryItem = ({ name }) => {
  if (!name) {
    return <div>No item name provided</div>;
  }

  return (
    <div>
      <h3>{name}</h3>
    </div>
  );
};

export default InventoryItem;
