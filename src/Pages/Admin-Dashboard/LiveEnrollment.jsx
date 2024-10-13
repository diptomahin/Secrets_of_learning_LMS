import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/UseAxios";
const LiveEnrollment = () => {
    const { id } = useParams();
    const [enrollment, setEnrollment] = useState([])
    const axiosPublic = useAxios();
    // console.log(enrollment.length)
    useEffect(() => {
        fetch('https://secrets-of-learning-server.onrender.com/live-enroll')
            .then(res => res.json())
            .then(data => {
                setEnrollment(data.filter(item => item.c_id == id || item.c_id == 'livecourse_1'))
            });
    }, [id, enrollment]);

    // Update Status function
    const updateStatus = (enrollmentId, newStatus) => {
        fetch(`https://secrets-of-learning-server.onrender.com/live-enroll/${enrollmentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }), // Send the new status to the server
        })
            .then(res => res.json())
            .then(updatedData => {
                // Optionally update the state to reflect the new status without needing to refetch the entire list
                setEnrollment(enrollment.map(item =>
                    item._id === enrollmentId ? { ...item, status: newStatus } : item
                ));
                toast.success(newStatus)
            });
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Make sure to await the delete request
                    const response = await axiosPublic.delete(`/live-enroll/${item._id}`);
    
                    if (response.status === 200) {
                        // Remove the deleted enrollment from state
                        setEnrollment((enrollment) => enrollment.filter((enrollment) => enrollment._id !== item._id));
    
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.error("Error deleting enrollment:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "There was an error deleting the enrollment.",
                        icon: "error"
                    });
                }
            }
        });
    };
    
    // console.log(enrollment)
    return (
        <div className="mt-10">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-xl font-semibold">
                            <th></th>
                            <th>Name</th>
                            <th>Whatsapp</th>
                            <th>Email</th>
                            <th>Transaction Number</th>
                            <th>Transaction ID</th>
                            <th>Details</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            enrollment.map(item => <tr className="" key={item._id}>
                                <td><RxCrossCircled onClick={() => handleDelete(item)} className="text-xl hover:text-prime" /></td>
                                <td>{item.name}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.email}</td>
                                <td>{item.transactionNumber}</td>
                                <td className="">{item.transactionId}</td>
                                <td className="text-center p-2"><button onClick={() => document.getElementById('my_modal_1').showModal()} className="bg-prime btn p-1 rounded-lg text-white">Details</button></td>
                                <td> <button
                                    onClick={() => updateStatus(item._id, item.status === 'not contacted' ? 'contacted' : 'not contacted')}
                                    className={`btn p-1 rounded-lg  ${item.status === 'contacted' ? 'bg-success' : 'bg-red'} text-white`}
                                >
                                    {item.status === 'contacted' ? 'Contacted' : 'Not Contacted'}
                                </button></td>
                                <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">More details</h3>
                                        <p className="py-2">
                                            <span className="font-bold">Name:</span>
                                            <span className="text-main font-semibold text-lg ml-2">{item.name}</span>
                                        </p>
                                        <p className="py-2">
                                            <span className="font-bold">Birth Date:</span>
                                            <span className="text-main font-semibold text-lg ml-2">{item.birth}</span>
                                        </p>
                                        <p className="py-2">
                                            <span className="font-bold">Phone Number:</span>
                                            <span className="text-main font-semibold text-lg ml-2">{item.phoneNumber}</span>
                                        </p>
                                        <p className="py-2">
                                            <span className="font-bold">Email:</span>
                                            <span className="text-main font-semibold text-lg ml-2">{item.email}</span>
                                        </p>
                                        <p className="py-2">
                                            <span className="font-bold">Address:</span>
                                            <span className="text-main font-semibold text-lg ml-2">{item.address}</span>
                                        </p>
                                        <p className="py-2">
                                            <span className="font-bold">Transaction Number:</span>
                                            <span className="text-main font-semibold text-lg ml-2">{item.transactionNumber}</span>
                                        </p>
                                        <p className="py-2">
                                            <span className="font-bold">Transaction ID:</span>
                                            <span className="text-main font-semibold text-lg ml-2">{item.transactionId}</span>
                                        </p>

                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LiveEnrollment;