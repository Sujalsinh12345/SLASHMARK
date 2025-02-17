
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food && food.length > 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>

      <div className="card mt-3" style={{ 
        width: "100%", 
        maxHeight: "none",
        border: "1px solid #E8E8E8",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease",
        cursor: "pointer"
      }}>
        <img 
          src={props.ImgSrc} 
          className="card-img-top" 
          alt={props.foodName} 
          style={{ 
            height: "160px", 
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px"
          }} 
        />
        <div className="card-body" style={{ padding: "16px" }}>
          <h5 
            className="card-title" 
            style={{ 
              fontSize: "18px",
              fontWeight: "600",
              color: "#2E3333",
              marginBottom: "12px"
            }}
          >
            {props.foodName}
          </h5>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select 
              className="m-2 h-100 w-20 rounded" 
              style={{ 
                border: "1px solid #E8E8E8",
                backgroundColor: "#FFFFFF",
                color: "#2E3333",
                padding: "4px 8px",
                cursor: "pointer"
              }} 
              onClick={handleClick} 
              onChange={handleQty}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select 
              className="m-2 h-100 w-20 rounded" 
              style={{ 
                border: "1px solid #E8E8E8",
                backgroundColor: "#FFFFFF",
                color: "#2E3333",
                padding: "4px 8px",
                cursor: "pointer"
              }} 
              ref={priceRef} 
              onClick={handleClick} 
              onChange={handleOptions}
            >
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className='d-inline ms-2 h-100 w-20 fs-5' style={{ color: "#2E3333" }}>
              ₹{finalPrice}/-
            </div>
          </div>
          <hr style={{ margin: "12px 0", borderColor: "#E8E8E8" }} />
          <button 
            className="btn justify-center ms-2" 
            style={{
              backgroundColor: "#FC8019",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              fontWeight: "600",
              width: "100%",
              transition: "background-color 0.2s ease"
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}
//
