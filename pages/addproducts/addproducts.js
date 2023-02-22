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
  const [isloading, setIsloading] = useState(false)



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
    setIsloading(true)
const coll = collection(database, "products");
const snapshots = await getCountFromServer(coll);
const numberOfDocuments = snapshots.data().count
console.log('count: ', numberOfDocuments);
    const data = {
      id: numberOfDocuments+1,
      title,
      price,
      imageUrl,
      description,
      feature: document.getElementById("featuredCheckbox").checked ? "Featured" : "Not a featured item"
    };
  await setDoc(doc(database, "products", `${numberOfDocuments+1}`), data);
  setTitle("")
  setPrice("")
  setImageUrl("")
  setDescription("")
  setIsloading(false)
  setSuccessfullySubmitted("Product Successfully added...")
  
  }
  
  return (
    <>
      <form className="w-full max-w-lg mt-24 mx-auto" onSubmit={AddProduct}>
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
    <label for="bordered-radio-1" className="pr-5 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Featured</label>
    <input id="featuredCheckbox" type="checkbox" name="feature" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
</div>

             </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            <input type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
          



{
  isloading ?
  <div role="status">
    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
: ""
}
            




          </div>
          <span className="text-blue-500 text-xs italic">{successfullySubmitted}</span>
        </div>
      </form>
      
    </>
  )
}

export default UploadProducts