import Link from "next/link";
import { useState, useEffect } from "react";
import user from "../../public/images/001-user.png";
import foundr from '../../public/svg/user.svg'
import Router from "next/router";
import {API} from '../../config'
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, update } from "../../actions/user";

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    password: "",
    error: false,
    success: false,
    loading: false,
    photo: "",
    userData: "",
  });

  const token = getCookie("token");
  const {
    username,
    name,
    email,
    about,
    password,
    error,
    success,
    loading,
    photo,
    userData,
  } = values;

  const init = () => {
    getProfile(token).then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error });
      } else {
        setValues({
          ...values,
          username: res.username,
          name: res.name,
          email: res.email,
          about: res.about,
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    console.log(e.target.value);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    let userFormData = new FormData();
    userFormData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userFormData,
      error: false,
      success: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    update(token, userData).then((res) => {
      if (res.error) {
        setValues({
          ...value,
          error: res.error,
          success: false,
          loading: false,
        });
      } else {
        updateUser(res, () => {
          setValues({
            ...values,
            username: res.username,
            name: res.name,
            email: res.email,
            about: res.about,
            success: true,
            loading: false,
          });
        })
        
      }
    });
  };

  const ProfileUpdateForm = () => (
    
    <form onSubmit={handleSubmit}>
      <div className="mx-12 mt-8">
        <div className="text-gray-900 mx-8">
          <input
            onChange={handleChange("photo")}
            type="file"
            accept="image/*"
          />
        </div>
        <div className="block text-gray-900 mt-4 pl-10 pr-64 font-semibold">
          <label>Username</label>
          <input
            onChange={handleChange("username")}
            value={username}
            type="text"
            className="text-gray-700 mt-1 text-left focus:outline-none focus:shadow-outline transition shadow-md rounded w-64 px-2 py-2"
          />
        </div>
        <div className="block text-gray-900 mt-4 pl-10 pr-64 font-semibold">
          <label>Name</label>
          <input
            onChange={handleChange("name")}
            value={name}
            type="text"
            className="text-gray-700 mt-1 text-left focus:outline-none focus:shadow-outline transition shadow-md rounded w-64 px-2 py-2"
          />
        </div>
        <div className="block text-gray-900 mt-4 pl-10 pr-64 font-semibold">
          <label>Email</label>
          <input
            onChange={handleChange("email")}
            value={email}
            type="text"
            className="text-gray-700 mt-1 text-left focus:outline-none focus:shadow-outline transition shadow-md rounded w-64 px-2 py-2"
          />
        </div>
        <div className="block text-gray-900 mt-4 pl-10 pr-64 font-semibold">
          <label>About</label>
          <textarea
            onChange={handleChange("about")}
            value={about}
            type="text"
            className="text-gray-700 mt-1 text-left focus:outline-none focus:shadow-outline transition shadow-md rounded w-64 px-2 py-2"
          />
        </div>
        <div className="block text-gray-900 mt-4 pl-10 pr-64 font-semibold">
          <label>Password</label>
          <input
            onChange={handleChange("password")}
            value={password}
            type="text"
            className="text-gray-700 mt-1 text-left focus:outline-none focus:shadow-outline transition shadow-md rounded w-64 px-2 py-2"
          />
        </div>
        <div className="text-center mb-16">
          <button
            type="button"
            className="inline-block dark-blue
          text-white px-5 py-3 mt-8 uppercase tracking-wider
          text-xs font-semibold hover:bg-blue-900 focus:outline-none focus:shadow-outline transition rounded-lg shadow-md"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
    
  );

  return (
    
    <React.Fragment>
    
      <div>
      <div>
      <img src={user} className="items-center mx-auto pt-6" alt="profile picture" />
      </div>
        <div>{ProfileUpdateForm()}</div>
      </div>
    </React.Fragment>
    
  );
};

export default ProfileUpdate;
