import React, { useEffect, useState } from "react";
import "./NewCollection.css";
import Item from '../Item/Item'

const NewCollection = () => {

  const [new_collection,setNew_collection] = useState([]);

  useEffect(()=>{
    fetch('https://localhost:44337/api/Product/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data))
},[])
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.imageUrl}
              newPrice={item.newPrice}
              oldPrice={item.oldPrice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollection;
