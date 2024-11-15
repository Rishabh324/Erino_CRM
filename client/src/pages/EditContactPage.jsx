import React from 'react'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import EditContact from '../components/EditContact'

const EditContactPage = () => {
  return (
    <Layout>
        <div className="flex flex-row h-full w-[100vw]">
        <Sidebar />
        <main className="p-3 w-full overflow-auto">
            <EditContact />
        </main>
      </div>
    </Layout>
  )
}

export default EditContactPage;