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
        <form onChange={handleChange}>
            <label><input type="checkbox" checked={filter["rejected"]} value={"rejected"}/>Rejected</label>
            <label><input type="checkbox" checked={filter["wishlist"]} value={"wishlist"}/>WishList</label>
            <label><input type="checkbox" checked={filter["applied"]} value={"applied"}/>Applied</label>
            <label><input type="checkbox" checked={filter["phoneScreen"]} value={"phoneScreen"}/>Phone Screen</label>
            <label><input type="checkbox" checked={filter["codingChallenge"]} value={"codingChallenge"}/>Coding Challenge</label>
            <label><input type="checkbox" checked={filter["techScreen"]} value={"techScreen"}/>Tech Screen</label>
            <label><input type="checkbox" checked={filter["onsite"]} value={"onsite"}/>Onsite</label>
            <label><input type="checkbox" checked={filter["offer"]} value={"offer"}/>Offer</label>
        </form>
    )
}
