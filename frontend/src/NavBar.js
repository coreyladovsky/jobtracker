import React from 'react'
import {logout} from './util/firebaseFunctions'
import Search from './features/search/Search'

export default () => {
    return(
        <nav>
            <Search />
            <button onClick={logout}>Log out</button>
        </nav>
    )
}
