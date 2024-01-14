/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SingleItem from './SingleItem';
const Items = ({ items }) => {
  return (
    <div className='items'>
      {items.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
