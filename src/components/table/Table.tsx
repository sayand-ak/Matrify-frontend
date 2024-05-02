import "./Table.css";

export function Table() {
    return (
        <table className="flex-col w-full">
            <thead>
                <tr className="text-center h-[50px]">
                    <th>SL NO</th>
                    <th>Name</th>
                    <th>Profile</th>
                    <th>Phone</th>
                    <th>OTP Verified</th>
                    <th>Status</th>
                    <th>More</th>
                </tr>
            </thead>
            <tbody>
                <tr className="text-center h-[50px]">
                    <td>1</td>
                    <td>John Doe</td>
                    <th className="flex justify-center">
                        <img src="../../src/assets/images/profile.png" alt="" className="h-10 w-10"/>
                    </th>
                    <td>123-456-7890</td>
                    <td>Yes</td>
                    <td>Active</td>
                    <td><button>Details</button></td>
                </tr>
                <tr className="text-center h-[50px]">
                    <td>2</td>
                    <td>Jane Smith</td>
                    <th className="flex justify-center">
                        <img src="../../src/assets/images/profile.png" alt="" className="h-10 w-10"/>
                    </th>
                    <td>987-654-3210</td>
                    <td>No</td>
                    <td>Inactive</td>
                    <td><button>Details</button></td>
                </tr>
                <tr className="text-center h-[50px]">
                    <td>3</td>
                    <td>Michael Johnson</td>
                    <th className="flex justify-center">
                        <img src="../../src/assets/images/profile.png" alt="" className="h-10 w-10"/>
                    </th>
                    <td>456-789-0123</td>
                    <td>Yes</td>
                    <td>Active</td>
                    <td><button>Details</button></td>
                </tr>
                <tr className="text-center h-[50px]">
                    <td>4</td>
                    <td>Sarah Brown</td>
                    <th className="flex justify-center">
                        <img src="../../src/assets/images/profile.png" alt="" className="h-10 w-10"/>
                    </th>
                    <td>789-012-3456</td>
                    <td>Yes</td>
                    <td>Active</td>
                    <td><button>Details</button></td>
                </tr>
                <tr className="text-center h-[50px]">
                    <td>5</td>
                    <td>Sarah Brown</td>
                    <th className="flex justify-center">
                        <img src="../../src/assets/images/profile.png" alt="" className="h-10 w-10"/>
                    </th>
                    <td>789-012-3456</td>
                    <td>Yes</td>
                    <td>Active</td>
                    <td><button>Details</button></td>
                </tr>
                <tr className="text-center h-[50px]">
                    <td>6</td>
                    <td>Sarah Brown</td>
                    <th className="flex justify-center">
                        <img src="../../src/assets/images/profile.png" alt="" className="h-10 w-10"/>
                    </th>
                    <td>789-012-3456</td>
                    <td>Yes</td>
                    <td>Active</td>
                    <td><button>Details</button></td>
                </tr>
                <tr className="text-center h-[50px]">
                    <td>7</td>
                    <td>Sarah Brown</td>
                    <th className="flex justify-center">
                        <img src="../../src/assets/images/profile.png" alt="" className="h-10 w-10"/>
                    </th>
                    <td>789-012-3456</td>
                    <td>Yes</td>
                    <td>Active</td>
                    <td><button>Details</button></td>
                </tr>
                <tr className="text-center h-[50px]">
                    <td>8</td>
                    <td>Sarah Brown</td>
                    <th className="flex justify-center">
                        <img src="../../src/assets/images/profile.png" alt="" className="h-10 w-10"/>
                    </th>
                    <td>789-012-3456</td>
                    <td>Yes</td>
                    <td>Active</td>
                    <td><button>Details</button></td>
                </tr>
                <tr className="text-center h-[50px]">
                    <td>9</td>
                    <td>Sarah Brown</td>
                    <th className="flex justify-center">
                        <img src="../../src/assets/images/profile.png" alt="" className="h-10 w-10"/>
                    </th>
                    <td>789-012-3456</td>
                    <td>Yes</td>
                    <td>Active</td>
                    <td><button>Details</button></td>
                </tr>
            </tbody>
        </table>
    )
}
