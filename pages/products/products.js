import React, { useEffect, useState } from 'react'

import { App, database } from '../../firebase/firebase'
import { getDocs, collection } from "firebase/firestore"; 
import styles from '@/styles/Home.module.css'

export async function getStaticProps() {
  const a = [];
    const snapshot = await getDocs(collection(database, "products"));
snapshot.forEach((doc) => {
  a.push(doc.data())
});
  return {
    props: {
      posts:a
    }
  }
}

function Products({posts}) {
  const [breakLoad, setBreakLoad] = useState(false)
  const [allData, setAllData] = useState("")
// setAllData(posts)
  
  
  
  return (
    <>
      <div className="mt-12 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    {
      posts ? 
      posts.map((item)=>{
        return(
          <div className="h-112 rounded overflow-hidden shadow-lg">
      <img className="w-full h-40" src={item.imageUrl} alt={item.title} />
      <div className="px-6 py-4 md:h-40 lg:h-48">
        <div className="font-bold text-xl mb-2">{item.title}</div>
        <p className="text-gray-700 text-base">
          {item.description.slice(0, 150)}
        </p>
      </div>
      <div className="px-6 pb-5">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Show Detail</button>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Rs: {item.price}</span>
        </div>
    </div>
        )
      })
      : ""
    }
  </div>
    </>
  )
}
export default Products
