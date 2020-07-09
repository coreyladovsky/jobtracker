import React from 'react'
import {logout} from './util/firebaseFunctions'

export default () => {
    return(
        <nav>
            <button onClick={logout}>Log out</button>
        </nav>
    )
}
