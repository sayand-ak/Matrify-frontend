import { useNavigate, useParams } from "react-router-dom";
import { FilterSlider } from "../../../components/FilterSlider/FilterSlider";
import { Footer } from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar"
import "./viewAllMatches.css";
import { useCallback, useEffect, useState } from "react";
import { UserData } from "../../../typings/user/userTypes";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { getMatches } from "../../../services/userAPI";
import { CarousalItems } from "../../../components/CarousalItems/CarousalItems";
import { toTitleCase } from "../../../utils/toTitleCase";

const ViewAllMatches = () => {
    const params = useParams();
    const [data, setData] = useState<UserData[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<UserData[]>([]);
    const [selectedFilterItem, setSelectedFilterItem] = useState<string | null>(null);
    
    const dispatch = useAppDispatch();

    const navigate = useNavigate();


    const fetchData = useCallback(async () => {
        try {            
            const response = await dispatch(getMatches({
                matchBase: params.matchBase || "", 
                matchKey: params.matchKey || "", 
                matchData: params.matchData || ""
            }));            
            const data = response.payload.data;
            setData(data);
        } catch (error) {
            navigate("/500");
        }
    }, [dispatch, params]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    async function handleFilterItemClick(item: string) {
        try {
            setSelectedFilterItem(item);
            const response = await dispatch(getMatches({
                matchBase: params.matchBase || "", 
                matchKey: params.matchKey || "", 
                matchData: item || ""
            }));
    
            if(response.payload.data) {
                setSelectedFilter(response.payload.data);
            }
        } catch (error) {
            navigate("/500");
        }
    };
    
    
    return (
        <div className="min-h-[100vh] w-full overflow-hidden">
            <div className="view-matches-header">
                <Navbar page="profile"/>
                <div className="page-label flex flex-col justify-center pl-[5rem] min-h-[60vh] w-full">
                    <h1 className="text-[45px] font-[15px]">{toTitleCase(params.matchKey || "")} matches for you</h1>
                    <p className="text-[17px] font-light">The match is based on data you provided</p>
                </div>
            </div>
            <div className="overflow-x-scroll no-scrollbar">
                <FilterSlider matchKey={params.matchKey || ""} handleFilterItemClick={handleFilterItemClick} selectedFilterItem={selectedFilterItem}/>
            </div>

            <div className="w-full flex justify-center py-10 z-[-1000]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:grid-cols-4  w-fit">
                    
                    {
                        selectedFilter.length > 0 ?

                        (selectedFilter.map((user, index) => (<CarousalItems index={index} data={user} key={index}/>)))
                        :
                        (data.map((user, index) => (<CarousalItems index={index} data={user} key={index}/>)))
                    }

                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default ViewAllMatches;