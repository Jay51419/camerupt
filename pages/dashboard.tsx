import { atom, useAtom, useSetAtom } from "jotai"
import { useEffect, useState } from "react"
import Brand from "../components/brand"
import TexturedBg from "../components/textured-bg"
import { WishListSchema } from "../utils/db"


const handleGet = async (id?: string) => {
  const data = await fetch("/api/wishlist", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return data
}
const handleAdd = async (name: string) => {
  const data = await fetch("/api/wishlist", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })
  return data
}
const handleDelete = async (id: string) => {
  const data = await fetch("/api/wishlist", {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  })
}
const handleUpdate = async (id: string, name: string) => {
  const data = await fetch("/api/wishlist", {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, name })
  })
  return data
}


const wishlist = atom<WishListSchema[]>([])


const Dashboard = () => {
  const [name, setName] = useState("")
  const [data] = useAtom(wishlist)
  const setData = useSetAtom(wishlist)
  useEffect(() => {
    handleGet()
      .then(async res => setData(await res.json()))
      .catch(err => console.error(err))
  }, [])
  return <div className="h-full w-full flex flex-col items-center "
  >
    <TexturedBg />
    <Brand />
    <div className='flex flex-col justify-center w-full md:w-96 mt-24' >
      <div>
        <div className='h-16 md:h-10 flex border-t border-l border-r border-gray-300'>
          <input min={1} type="text" onChange={e => setName(e.target.value)} value={name} className="h-full w-full justify-self-stretch  border-gray-300 pl-4 pr-12 focus:outline-primary text-lg" />

          <button
            className='bg-primary px-4 py-2 text-white'
            onClick={() => {
              if (name.length !== 0) {
                handleAdd(name)
                  .then(async res => console.log(await res.json()))
                  .then(_ => {
                    handleGet()
                      .then(async res => setData(await res.json()))
                      .catch(err => console.error(err))
                  })
                  .then(e => setName(""))
              }
            }
            }>Add</button>
        </div>
      </div>
      <ul className='border border-gray-300' >
        {
          data.length !== 0 && data.map(el => <WishlistCard id={el.id} name={el.name} key={el.id} />)
        }
      </ul>
    </div>
  </div>
}

export default Dashboard;


const WishlistCard = ({ id, name }: { id: string, name: string }) => {
  const setData = useSetAtom(wishlist)
  const [updateName, setUpdateName] = useState(name)
  const [showUpdateBtn, setShowUpdateBtn] = useState(false)

  return <li key={id}>
    <div className='w-full bg-white px-2  py-4 flex justify-between'>
      {!showUpdateBtn ?
        <span className='py-2 text-lg' >{name}</span>
        : <input type="text" min={1} value={updateName} onChange={e => setUpdateName(e.target.value)} className='w-full justify-self-stretch border border-gray-300 pl-4 pr-12 focus:outline-primary text-lg' />}
      <div>
        {!showUpdateBtn && <button className='text-primary px-2 py-2' onClick={() => {
          setShowUpdateBtn(true)
        }}>
          Update
        </button>}
        {
          !showUpdateBtn && <button className='text-gray-500' onClick={() => {
            handleDelete(id)
              .then(_ => {
                handleGet()
                  .then(async res => setData(await res.json()))
                  .catch(err => console.error(err))
              })
          }}>Delete</button>
        }


        {showUpdateBtn && <button className='text-primary px-2 py-2' onClick={() => {
          if (updateName.length !== 0) {
            handleUpdate(id, updateName)
              .then(_ => {
                handleGet()
                  .then(async res => setData(await res.json()))
                  .catch(err => console.error(err))
              })
              .then(_ => setShowUpdateBtn(false))
          }
        }}>
          Okay
        </button>}
        {showUpdateBtn && <button className='text-gray-500 px-2 py-2' onClick={() => {
          setShowUpdateBtn(false)
        }}>
          Cancel
        </button>}
      </div>
    </div>
    <hr />
  </li>
}

