import React from "react";

function titleCase(str) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const Rank = ({ name, entries }) => {
  name = titleCase(name)
  return (
    <div>
      <div class="title-font text-white text-2xl mb-4 mt-10 font-medium sm:text-3xl">
        <p class="text-center">{`${name}, you have detected`}</p>
        <p class="text-center">{`${entries} faces so far.`}</p>
      </div>
    </div>
  );
};

export default Rank;
