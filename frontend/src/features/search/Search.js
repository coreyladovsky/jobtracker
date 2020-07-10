import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectSearch, updateSearch } from './searchSlice';

export default () => {
    const searchTerm = useSelector(selectSearch)
    const dispatch = useDispatch();
    return(
        <div>
            <input value={searchTerm} onChange={(e) => dispatch(updateSearch(e.target.value))}/>
        </div>
    )
}
