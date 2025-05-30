
import React, { use, useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
const getpassword= async () => {
   let req= await fetch("http://localhost:3000/")
   let passwords= await req.json()
    
      setpasswordArray(passwords)
    
}

  useEffect(() => {
   getpassword()
    let passwords = localStorage.getItem("passwords");


  }, []);

  const showpassword = () => {
    passwordref.current.type = "text";
    if (ref.current.src.includes("icons/hide.svg")) {
      ref.current.src = "icons/eye.svg";
      passwordref.current.type = "password";
    } else {
      passwordref.current.type = "text";
      ref.current.src = "icons/hide.svg";
    }
  };

  const savepassword = () => {
    if(form.site.length>3&&form.username.length>3&&form.password.length>3){
    console.log(form);
    setpasswordArray([...passwordArray, {...form,id: uuidv4()}]);
    
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]));
    console.log([...passwordArray, form]);
    setform({ site: "", username: "", password: "" })
    toast.success("Credentials Saved", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
  else{
    toast.success("Error", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  }
};

   const deletepassword = (id) => {
    console.log("deleting paswword with id",id)
    let c= confirm("Do you want to delete")
    if(c){
    setpasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    toast.success("Password deleted successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    }

  
  };

  const editpassword = (id) => {
    console.log("deleting paswword with id",id)
    setform(passwordArray.filter(i=>i.id===id)[0])

    setpasswordArray(passwordArray.filter(item=>item.id!==id));
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const copytext = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="fixed inset-0 -z-10 w-full h-full min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>



      <div className="px-2 md:px:0 md: mycontainer min-h-[83vh]  ">
        <h1 className="text-4xl font-bold text-center text-white">
          <span className="font-bold">&lt;</span>
          <span className="font-bold">Safe</span>
          <span className="font-bold">Stack</span>
          <span className="font-bold">&gt;</span>
        </h1>
        <p className="text-lg text-center text-white">
          Your passwords, safely stacked now
        </p>
        <div className="flex flex-col p-4 text-white gap-5 items-center">
          <input
            value={form.site}
            onChange={handlechange}
            className="rounded-full border border-purple-800 w-full p-4 py-1"
            type="text"
            name="site"
            id=""
            placeholder="Enter website name"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handlechange}
              className="rounded-full border border-purple-800 w-full p-4 py-1"
              type="text"
              name="username"
              id=""
              placeholder="Enter username"
            />
            <div className="relative">
              <input
                ref={passwordref}
                value={form.password}
                onChange={handlechange}
                className="rounded-full border border-purple-800 w-full p-4 py-1 text-white"
                type="password"
                name="password"
                id=""
                placeholder="Enter password"
              />
              <span
                className="absolute right-2.5 top-1.5   cursor-pointer"
                onClick={showpassword}
              >
                <img ref={ref} className="" src="icons/eye.svg" alt="" />
              </span>
            </div>
          </div>
          <button
            onClick={savepassword}
            className="flex justify-center items-center bg-purple-500 gap-2 hover:bg-purple-300  rounded-full  px-8 py-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-white font-bold text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-white">No passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto text-white w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-purple-500">
                <tr>
                  <th className="py-2">Website name</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2"> Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center ">
                        <a href="{item.site}" target="_blank">
                          {item.site}
                        </a>
                        <div
                          className="flex items-center justify-center lordiconcopy"
                          onClick={() => {
                            copytext(item.site);
                          }}
                        >
                          <lord-icon
                            className={""}
                            src="https://cdn.lordicon.com/kydcudfv.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                            }}
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="py-2 border border-white   text-center  ">
                        {item.username}
                        <div
                          className="flex items-center justify-center lordiconcopy"
                          onClick={() => {
                            copytext(item.username);
                          }}
                        >
                          <lord-icon
                            className={""}
                            src="https://cdn.lordicon.com/kydcudfv.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                            }}
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center  ">
                        {item.password}
                        <div
                          className="flex items-center justify-center lordiconcopy"
                          onClick={() => {
                            copytext(item.password);
                          }}
                        >
                          <lord-icon
                            className={""}
                            src="https://cdn.lordicon.com/kydcudfv.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                            }}
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center  ">
                        <span className="cursor-pointer mx-1" onClick={()=>{editpassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            state="hover-line"
                           colors="primary:#ffffff,secondary:#ffffff"
                            style={{"width":"25px","height":"25px"}}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1" onClick={()=>{deletepassword(item.id)}}>
                          <lord-icon
                             src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="hover"
                            state="hover-line"
                           colors="primary:#ffffff,secondary:#ffffff"
                            style={{"width":"25px","height":"25px"}}
                          ></lord-icon>
                        </span>
                      </td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;