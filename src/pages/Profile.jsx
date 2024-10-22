import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
 
import { changePassword } from '../services/operations/Profile';

const Profile = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    
    
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const { oldPassword, newPassword, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };
console.log("user",formData);

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if(password.length < 8){
            alert("Password must be of at least eight characters");
            return;
        }
         ;
    };

    return (
        <div className="flex justify-between min-h-screen w-full bg-gray-100">
            <div className="w-full bg-white rounded-lg shadow-lg p-6">
                {/* Profile Header */}
                <div className="flex flex-col gap-1 p-6">
                    <h2 className="text-2xl font-bold text-gray-700">{user?.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">Started on {new Date(user.created_at).toLocaleDateString()}</p>
                </div>

                {/* Profile Details */}
                <div className="mt-6 p-5">
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600 font-semibold">Mobile No.:</span>
                        <span className="text-gray-700">+91-{user?.phone}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600 font-semibold">Email:</span>
                        <span className="text-gray-700">{user?.email}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600 font-semibold">Account Creation:</span>
                        <span className="text-gray-700">{new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600 font-semibold">Last Login:</span>
                        <span className="text-gray-700">{new Date(user.last_login).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600 font-semibold">Role:</span>
                        <span className="text-gray-700">{user?.accountType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600 font-semibold">Roll No.:</span>
                        <span className="text-gray-700">MCA/{user.user_id}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600 font-semibold">Reg. No.:</span>
                        <span className="text-gray-700">TPNITB-MCA2023{user.user_id}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600 font-semibold">Account Status:</span>
                        <span className="text-green-600 font-semibold">Active</span>
                    </div>
                </div>

                {/* Change Password */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Change Password</h3>
                    <div className="space-y-3">
                        <input
                            type="password"
                            name="oldPassword"
                            value={oldPassword}
                            onChange={handleOnChange}
                            placeholder="Enter Old Password"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={handleOnChange}
                            placeholder="Enter New Password"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            className="w-max p-6 bg-blue-950 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
