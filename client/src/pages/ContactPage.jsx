import React from 'react'
import Layout from '../components/Layout'
import Contact from '../components/Contact'
import Sidebar from '../components/Sidebar'

const ContactPage = () => {
  return (
    <Layout>
      <div className="flex flex-row h-full w-[100vw]">
        <Sidebar />
        <main className="p-3 w-full overflow-auto">
            <Contact />
        </main>
      </div>
    </Layout>
  )
}

export default ContactPage