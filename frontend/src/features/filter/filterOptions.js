import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, updateFilter } from './filterSlice';

export default () => {
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(updateFilter(e.target.value))
    }
    return(
        <form >
            <label><input type="checkbox" checked={filter["rejected"]} value={"rejected"} onChange={handleChange}/>Rejected</label>
            <label><input type="checkbox" checked={filter["wishlist"]} value={"wishlist"} onChange={handleChange}/>WishList</label>
            <label><input type="checkbox" checked={filter["applied"]} value={"applied"} onChange={handleChange}/>Applied</label>
            <label><input type="checkbox" checked={filter["phoneScreen"]} value={"phoneScreen"} onChange={handleChange}/>Phone Screen</label>
            <label><input type="checkbox" checked={filter["codingChallenge"]} value={"codingChallenge"} onChange={handleChange}/>Coding Challenge</label>
            <label><input type="checkbox" checked={filter["techScreen"]} value={"techScreen"} onChange={handleChange}/>Tech Screen</label>
            <label><input type="checkbox" checked={filter["onsite"]} value={"onsite"} onChange={handleChange}/>Onsite</label>
            <label><input type="checkbox" checked={filter["offer"]} value={"offer"} onChange={handleChange}/>Offer</label>
        </form>
    )
}
