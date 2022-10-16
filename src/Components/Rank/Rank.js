import React from "react";


function titleCase(str) {
    return str
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div class="title-font text-white text-2xl mb-4 mt-10 font-medium sm:text-3xl">
                {`${titleCase(name)}, so far you have detected ${entries} faces`}
            </div>
        </div>
    )
}

export default Rank