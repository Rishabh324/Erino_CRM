import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import AddContact from '../components/AddContact'

const AddContactPage = () => {
  return (
    <Layout>
      <div className="flex flex-row h-full w-[100vw]">
        <Sidebar />
        <main className="p-3 w-full overflow-auto">
            <AddContact />
        </main>
      </div>
    </Layout>
  )
}

export default AddContactPage;