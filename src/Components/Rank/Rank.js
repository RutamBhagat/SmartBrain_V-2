import React from "react";


const Rank = ({ name, entries }) => {
    return (
        <div>
            <div class="title-font text-white text-2xl mb-4 mt-10 font-medium sm:text-3xl">
                {`${name}, you currently have ${entries} entries`}
            </div>
        </div>
    )
}

export default Rank