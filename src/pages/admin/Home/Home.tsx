import Sidebar from "../../../components/sidebar/Sidebar";
import { Table } from "../../../components/table/Table";
import "./Home.css";

export function Home() {
    return (
        <div className="flex md:justify-start md:items-start relative">
            <Sidebar/>

            <div className="nav h-[10vh] md:w-[80%] fixed z-0 md:ml-[20%] flex items-center justify-between px-3 md:px-8">
                <input type="text" className="bg-[#fff] w-[250px] md:w-[300px] pl-5 py-3 rounded-[5px] outline-none" placeholder="Search here..."/>
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-full" style={{backgroundImage:"url(../../src/assets/images/profile.png)", backgroundSize:"cover", backgroundPosition:"center"}}></div>
            </div>

            <div className="overflow-scroll bg-[#F4F7F9] h-[fit-content] md:w-[75%]  z-0 mt-[25%] md:mt-[10%] md:ml-[23%] flex items-center justify-between py-3 rounded-[10px] md:px-8">
                <Table/>   
            </div>

        </div>
    )
}