import React, { useState } from 'react'
import { app, database } from '../../firebase/firebase'
import { collection, addDoc } from 'firebase/firestore';

function UploadProducts() {
  const [imageUrl, setImageUrl] = useState()
  const [imageUrlError, setImageUrlError] = useState()
  const [title, setTitle] = useState()
  const [titleError, setTitleError] = useState()
  const [price, setPrice] = useState()
  const [priceError, setPriceError] = useState()
  const [description, setDescription] = useState()
  const [descriptionError, setDescriptionError] = useState()

  const dbInstance = collection(database, 'products');

  let a;
  const AddProduct = (e) => {
    e.preventDefault()
    try {
      a = new URL(imageUrl)
      setImageUrlError("")
    } catch (error) {
      setImageUrlError("Please enter a valid URL!")
    }
    title.length < 4 ? setTitleError("Please enter minimum 3 chracter title!") : setTitleError("")
    price < 1 ? setPriceError("Please enter valid product price") : setPriceError("")
    description.length < 15 ? setDescriptionError("Please enter minimum 15 characters") : setDescriptionError("")
    ADD()
  }
  const ADD = ()=>{
    const data = {
      title,
      price,
      imageUrl,
      description
    };
    addDoc(dbInstance, {
      noteTitle: data
  })
  }
  return (
    <>
      <form class="w-full max-w-lg mt-24" onSubmit={AddProduct}>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Title <span class="text-red-500 text-xs italic">{titleError}</span>
            </label>
            <input onChange={e => setTitle(e.target.value)} class="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Price <span class="text-red-500 text-xs italic">{priceError}</span>
            </label>
            <input onChange={e => setPrice(e.target.value)} class="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-price" type="number" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Image URL <span class="text-red-500 text-xs italic">{imageUrlError}</span>
            </label>
            <input onChange={e => setImageUrl(e.target.value)} class="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" type="text" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              Description <span class="text-red-500 text-xs italic">{descriptionError}</span>
            </label>
            <textarea onChange={e => setDescription(e.target.value)} class="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" type="text"></textarea>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full px-3 mb-6 md:mb-0">
            <input type="submit" value="Submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
          </div>
        </div>

      </form>
    </>
  )
}

export default UploadProducts