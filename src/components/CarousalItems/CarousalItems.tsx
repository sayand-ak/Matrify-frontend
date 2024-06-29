import { motion } from "framer-motion";
import { UserData } from "../../typings/user/userTypes"

interface CarousalItemsProps {
    data: UserData;
    index: number;
}

export function CarousalItems({ data, index }: CarousalItemsProps) {

    function calculateAgeInYears(dobString: string): number | null {

        if (!dobString) {
            return null;
        }

        try {
            const dob = new Date(dobString);

            const today = new Date();

            let age = today.getFullYear() - dob.getFullYear();
            const months = today.getMonth() - dob.getMonth();

            if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
                age--;
            }

            return age;
        } catch (error) {
            console.error("Error parsing date string:", error);
            return null;
        }
    }



    return (
    <motion.div
        className="card"
        initial={{
            opacity: 0,
            x: 100
        }}
        whileInView={{
            opacity: 1,
            x: 0, 
            transition: {
            duration: 1,
            delay: 0.5 * index 
            }
    }}>
            <a href={`/profile/${data._id}`}
            >
                <div
                    className="relative h-[280px] w-[250px] bg-[#ebe3d48d] rounded-lg overflow-hidden"
                    style={{ backgroundImage: `url(${data.image ? data.image : "../src/assets/images/profile.png"})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                    <div className="absolute bottom-0 text-white  w-full h-16 bg-gradient-to-b from-[#00000055] to-[#000000] pl-5">
                        <div className="flex gap-1 items-center font-semibold text-[20px]">
                            <h1>{data.username}</h1>,
                            <span>{calculateAgeInYears(data.dob || "")}</span>
                        </div>
                        Kerala, Kochi
                    </div>
                </div>
            </a>

    </motion.div>
    )
}