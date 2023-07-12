import { useContext, useState, useRef } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function MyAccount() {
  const {setAccount} = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')

  // Account
  const localAccount = localStorage.getItem('account');
  const parsedAccount = JSON.parse(localAccount);

  const form = useRef(null)

  const editAccount = () => {
    const formData = new FormData(form.current)
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password')
		}

    // Update account
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    setAccount(data)
  }

  const renderUserInfo = () => {
    return (
      <div className='flex flex-col w-80 gap-6 mt-[40px]'>
        <p>
          <span className='font-normal text-sm'>Name: </span>
          <span className='px-2 font-semibold '>{parsedAccount?.name}</span>
        </p>
        <p>
          <span className='font-normal text-sm'>Email: </span>
          <span className='px-2 font-semibold'>{parsedAccount?.email}</span>
        </p>
        <button
          className='bg-[#9274ce] text-white w-full rounded-lg py-3'
          onClick={() => setView('edit-user-info')}>
          Edit
        </button>
      </div>
    )
  }

  const renderEditUserInfo = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-80 mt-[40px]'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='font-normal text-sm'>Your name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount.name}
            placeholder="Awesome Person"
            className='rounded-lg border border-[#2b0081] placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-normal text-sm'>Your email:</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount.email}
            placeholder="awesome.person@astro.com"
            className='rounded-lg border border-[#2b0081] placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password" className='font-normal text-sm'>Your password:</label>
          <input
            type="test"
            id="password"
            name="password"
            defaultValue={parsedAccount.password}
            placeholder="******"
            className='rounded-lg border border-[#2b0081] placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <button
          className='bg-[#9274ce] text-white w-full rounded-lg py-3'
          onClick={() => {setView('user-info'), editAccount()}}>
          Save Changes
        </button>
      </form>
    )
  }

  const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()

  return (
    <Layout>
        <h1 className='font-medium text-xl text-center mt-[10px] mb-6 w-80 border-t-4 border-t-[#e5d8ff] border-solid'>
            <div className='mt-[30px]'>
                My account
            </div>
        </h1>
        {renderView()}
    </Layout>
  )
}

export default MyAccount