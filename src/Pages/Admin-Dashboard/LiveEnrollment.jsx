import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LiveEnrollment = () => {
    const { id } = useParams();
    const [enrollment, setEnrollment] = useState([])

    useEffect(() => {
        fetch('https://secrets-of-learning-server.onrender.com/live-enroll')
            .then(res => res.json())
            .then(data => {
                setEnrollment(data.filter(item => item.c_id == id))
            });
    }, [id, enrollment]);

    // console.log(enrollment)
    return (
        <div className="mt-10">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-xl font-semibold">
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            enrollment.map(item => <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.email}</td>
                                <td className="">{item.transactionId}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LiveEnrollment;