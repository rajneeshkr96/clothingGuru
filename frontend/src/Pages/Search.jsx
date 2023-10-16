import React from 'react'
import {useParams } from 'react-router-dom';
function Search() {
    let { keyword } = useParams();
    console.log(keyword)
  return (
    <div>
      test
    </div>
  )
}

export default Search
