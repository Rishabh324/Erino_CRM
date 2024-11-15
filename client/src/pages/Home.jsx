import Layout from "../components/Layout"
import { useSelector } from "react-redux"
import Sidebar from "../components/Sidebar";

const Home = () => {
    const { user } = useSelector(state => state.auth);
    return (
        <Layout>
            <div className="flex flex-row h-full w-[100vw]">
                <Sidebar />
                <main className="p-3 w-full overflow-auto">                    
                    <div>
                        <h1 className="text-4xl p-4 font-semibold">Your Profile</h1>
                        <div className="p-4 text-lg">
                            <div className="flex my-2">
                                <p className="p-2 w-72">Name:</p>
                                <input
                                    type="text"
                                    value={user?.name}
                                    readOnly
                                    className="border-2 px-3 border-gray-300 rounded-lg cursor-not-allowed"
                                />
                            </div>
                            <div className="flex my-2">
                                <p className="p-2 w-72">Email:</p>
                                <input
                                    type="text"
                                    value={user?.email}
                                    readOnly
                                    className="border-2 px-3 border-gray-300 rounded-lg cursor-not-allowed"
                                />
                            </div>
                            <div className="flex my-2">
                                <p className="p-2 w-72">Password:</p>
                                <input
                                    type="password"
                                    value={user?.password}
                                    readOnly
                                    className="border-2 px-3 border-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    )
}

export default Home