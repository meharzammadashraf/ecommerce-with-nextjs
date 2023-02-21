import React, { useState } from 'react'
import { App, database } from '../../firebase/firebase'
import { doc, setDoc, getDocs, collection, getCountFromServer } from "firebase/firestore"; 

function UploadProducts() {
  const [imageUrl, setImageUrl] = useState()
  const [imageUrlError, setImageUrlError] = useState("")
  const [title, setTitle] = useState()
  const [titleError, setTitleError] = useState("")
  const [price, setPrice] = useState()
  const [priceError, setPriceError] = useState("")
  const [description, setDescription] = useState()
  const [descriptionError, setDescriptionError] = useState("")
  const [successfullySubmitted, setSuccessfullySubmitted] = useState()



  let a;
  const AddProduct = (e) => {
    e.preventDefault()
    try {
      a = new URL(imageUrl)
      setImageUrlError("")
    } catch (error) {
      setImageUrlError("Please enter a valid URL!")
    }
    if (!title) {
      setTitleError("Please enter minimum 3 chracter title!")
    } else if(!price) {
      setPriceError("Please enter valid product price")
      setTitleError("")
    } else if(!description){
      setDescriptionError("Please enter minimum 15 characters")
      setPriceError("")
    }else{
      setTitleError("")
      setPriceError("")
      setDescriptionError("")
      
      ADD()
    }
  }
  const ADD = async()=>{
const coll = collection(database, "products");
const snapshots = await getCountFromServer(coll);
const numberOfDocuments = snapshots.data().count
console.log('count: ', numberOfDocuments);
    const data = {
      title,
      price,
      imageUrl,
      description,
      feature: document.querySelector('input[name="feature"]:checked').value
    };
  await setDoc(doc(database, "products", `${numberOfDocuments+1}`), data);
  setTitle("")
  setPrice("")
  setImageUrl("")
  setDescription("")
  setSuccessfullySubmitted("Product Successfully added...")
  
  }
  
  return (
    <>
      <form className="w-full max-w-lg mt-24" onSubmit={AddProduct}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Title <span className="text-red-500 text-xs italic">{titleError}</span>
            </label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Price <span className="text-red-500 text-xs italic">{priceError}</span>
            </label>
            <input value={price} onChange={e => setPrice(e.target.value)} className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-price" type="number" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Image URL <span className="text-red-500 text-xs italic">{imageUrlError}</span>
            </label>
            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" type="text" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              Description <span className="text-red-500 text-xs italic">{descriptionError}</span>
            </label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" type="text"></textarea>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            
<div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
    <input checked id="bordered-radio-1" type="radio" value="Not a featured" name="feature" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label for="bordered-radio-1" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Not a featured item</label>
</div>
<div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
    <input id="bordered-radio-2" type="radio" value="Featured" name="feature" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label for="bordered-radio-2" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Featured item</label>
</div>

             </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            <input type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
          </div>
          <span className="text-red-500 text-xs italic">{successfullySubmitted}</span>
        </div>
      </form>
      
    </>
  )
}

export default UploadProducts