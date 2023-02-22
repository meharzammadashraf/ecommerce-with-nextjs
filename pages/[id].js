import { database } from '../firebase/firebase'
import { getDocs, collection } from "firebase/firestore";


function DynamicProducts({newArray}) {
    return (
        <>
            <div class="mt-9 p-10">  
    <div class="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
      <img class="w-full" src={newArray[0].imageUrl} alt={newArray[0].title} />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{newArray[0].title}</div>
        <p class="text-gray-700 text-base">
        {newArray[0].description}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Rs: {newArray[0].price}/<sub>=</sub></span>
      </div>
    </div>
  </div>
        </>
    )
}
// This function gets called at build time
export async function getStaticPaths() {
    const a = [];
    const snapshot = await getDocs(collection(database, "products"));
snapshot.forEach((doc) => {
  a.push(doc.data())
});
    const paths = a.map((post) => ({
        params: { id: post.id.toString() },
    }))
    return { paths, fallback: false }
}
export async function getStaticProps(context) {
   const id = context.params.id
    const a = []
    const snapshot = await getDocs(collection(database, "products"));
snapshot.forEach((doc) => {
  a.push(doc.data())
});
const newArray = a.filter(function (el) {
    return el.id == id;
});
    return { props: {newArray} }
}

export default DynamicProducts