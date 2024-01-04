import { collection, addDoc, query, setDoc, where } from "firebase/firestore";
import { useAuth } from "../firebase/Auth";
import { db, storage } from "../firebase/base";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export const Kyc = () => {
  const [pfp, setPfp] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    address: "",
    college: "",
    degree: "",
    gender: "",
    language: "",
    linkdein: "",
    github: "",
    portfolio: "",
  });

  const [info, setInfo] = useState();
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const getUserData = async () => {
    //* query to get user data based on user id
    const userDataQuery = query(
      collection(db, "users"),
      where("uid", "==", `${currentUser.user.uid}`)
    );
    //* storing userdata in useState to use in the component
    const userData = await addDoc(userDataQuery);
    userData.forEach((doc) => {
      setInfo(doc.data());
    });
  };

  const getUserName = () => {
    const fName = info?.firstName
      ? info.firstName[0].toUpperCase() + info.firstName.slice(1)
      : " ";

    const lName = info?.lastName
      ? info.lastName[0].toUpperCase() + info.lastName.slice(1)
      : " ";
    setUserName(`${fName} ${lName}`);
  };

  useEffect(() => {
    const onMount = async () => {
      await getUserData();
      getUserName();
    };

    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGender = (e) => {
    setUserData((prev) => ({
      ...prev,
      gender: `${e.target.value}`,
    }));
  };

  const handleLanguage = (e) => {
    setUserData((prev) => ({
      ...prev,
      language: `${e.target.value}`,
    }));
  };

  const handleProfile = async (e) => {
    const fileName = e.target.files[0];
    const imageRef = ref(storage, `profiles/${fileName.name}`);
    try {
      if (fileName) {
        await uploadBytes(imageRef, fileName);
        await getDownloadURL(imageRef).then((url) => setPfp(url));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const submitForm = async (ev) => {
    ev.preventDefault();
    try {
      await setDoc(collection(db, "kyc"), {
        uid: currentUser.user.uid,
        ...userData,
      });
      navigate("/success");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="w-full h-full min-h-[100vh] bg-[#3e3e3e] flex justify-center items-center text-[#fefefe]">
        <div className="w-full h-full px-3 py-4">
          <div className="flex items-center justify-between w-full px-2 py-4">
            <h1 className="text-[#39b2ad] text-4xl">KYC Form</h1>
            <h6 className="text-[#c0c0c0]">
              Logged in as{" "}
              <span className="text-[#39b2ad]">
                {userName ? userName : "..."}
              </span>
            </h6>
          </div>
          <div className="flex items-center justify-center h-full min-w-full px-4 py-8 login">
            <form
              className="grid w-full h-full gap-6 lg:grid-cols-2"
              onSubmit={submitForm}
            >
              <div className="">
                <div className="relative flex items-center justify-center w-full pt-4 pb-8">
                  {pfp.length === 0 ? (
                    <div className="w-[150px] h-[150px] border rounded-full z-0"></div>
                  ) : (
                    <div className="w-[150px] h-[150px]  rounded-full z-0 overflow-hidden">
                      <img src={pfp} className="w-full h-full" />
                    </div>
                  )}

                  <div className="absolute bottom-[20px] right-[43%] w-[40px]  h-[40px] flex justify-center items-center rounded-full p-2 z-20 bg-[#3e3e3e] ">
                    <label
                      htmlFor="pfpInput"
                      className="z-0 flex items-center justify-center w-full h-full cursor-pointer"
                    >
                      <input
                        type="file"
                        id="pfpInput"
                        className="hidden"
                        onChange={handleProfile}
                      />
                      <Pencil size={20} color="white" className="" />
                    </label>
                  </div>
                </div>
                <div className="grid items-center w-full gap-4 py-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="f_name"
                      className="text-sm text-[#c0c0c0] pb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="f_name"
                      required
                      autoComplete="off"
                      className="px-3 py-2 text-lg bg-transparent border rounded-md outline-none focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          firstName: `${e.target.value}`,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="l_name"
                      className="text-sm text-[#c0c0c0] pb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="l_name"
                      required
                      autoComplete="off"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          lastName: `${e.target.value}`,
                        }))
                      }
                      className="px-3 py-2 text-lg bg-transparent border rounded-md outline-none focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <label className="text-sm text-[#c0c0c0]" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    id="email"
                    autoComplete="off"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        email: `${e.target.value}`,
                      }))
                    }
                    className="px-3 py-2 text-lg bg-transparent border rounded-md outline-none focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                  />
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <label className="text-sm text-[#c0c0c0]" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    type="number"
                    maxLength={10}
                    id="phone"
                    required
                    autoComplete="off"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: `${e.target.value}`,
                      }))
                    }
                    className="px-3 py-2 text-lg bg-transparent border rounded-md outline-none focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                  />
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <label
                    className="text-sm text-[#c0c0c0]"
                    htmlFor="nationality"
                  >
                    Nationality
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    required
                    autoComplete="off"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        nationality: `${e.target.value}`,
                      }))
                    }
                    className="px-3 py-2 text-lg bg-transparent border rounded-md outline-none focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                  />
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <label className="text-sm text-[#c0c0c0]" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    id="address"
                    required
                    autoComplete="off"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: `${e.target.value}`,
                      }))
                    }
                    className="px-3 py-2 text-lg bg-transparent border rounded-md outline-none focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                  />
                </div>
              </div>
              {/* //!TODO */}
              <div className="">
                <div className="flex flex-col gap-2 py-2">
                  <label className="text-sm text-[#c0c0c0]" htmlFor="college">
                    College
                  </label>
                  <input
                    type="text"
                    id="college"
                    required
                    autoComplete="off"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        college: `${e.target.value}`,
                      }))
                    }
                    className="px-3 py-2 text-lg bg-transparent border rounded-md outline-none focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                  />
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <label className="text-sm text-[#c0c0c0]" htmlFor="degree">
                    Degree
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    id="degree"
                    required
                    autoComplete="off"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        degree: `${e.target.value}`,
                      }))
                    }
                    className="px-3 py-2 text-lg bg-transparent border rounded-md outline-none focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                  />
                </div>
                <div className="grid items-center w-full gap-4 py-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="gender"
                      className="text-sm text-[#c0c0c0] pb-2"
                    >
                      Gender
                    </label>
                    <select
                      className="px-3 py-2 bg-transparent border rounded-md outline-none text-md focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                      id="gender"
                      value={userData.gender}
                      onChange={handleGender}
                    >
                      <option className="" value="">
                        Choose your gender
                      </option>
                      <option className="" value="Male">
                        Male
                      </option>
                      <option className="" value="Female">
                        Female
                      </option>
                      <option className="" value="Others">
                        Others
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="language"
                      className="text-sm text-[#c0c0c0] pb-2"
                    >
                      Language
                    </label>
                    <select
                      className="px-3 py-2 bg-transparent border rounded-md outline-none text-md focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                      id="language"
                      value={userData.language}
                      onChange={handleLanguage}
                    >
                      <option className="" value="">
                        Choose a language
                      </option>
                      <option className="" value="English">
                        English
                      </option>
                      <option className="" value="Nepali">
                        Nepali
                      </option>
                      <option className="" value="Hindi">
                        Hindi
                      </option>
                      <option className="" value="Others">
                        Others
                      </option>
                    </select>
                  </div>
                </div>
                <div className="grid items-center w-full gap-4 py-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="linkdein"
                      className="text-sm text-[#c0c0c0] pb-2"
                    >
                      LinkdeIn
                    </label>
                    <input
                      type="text"
                      className="px-3 py-2 bg-transparent border rounded-md outline-none text-md focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                      id="linkdein"
                      autoComplete="off"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          linkdein: `${e.target.value}`,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="github"
                      className="text-sm text-[#c0c0c0] pb-2"
                    >
                      GitHub
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      className="px-3 py-2 bg-transparent border rounded-md outline-none text-md focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                      id="github"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          github: `${e.target.value}`,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <label className="text-sm text-[#c0c0c0]" htmlFor="portfolio">
                    Portfolio
                  </label>
                  <input
                    type="text"
                    id="portfolio"
                    required
                    autoComplete="off"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        portfolio: `${e.target.value}`,
                      }))
                    }
                    className="px-3 py-2 text-lg bg-transparent border rounded-md outline-none focus:outline-none hover:bg-[#7473738c] focus:border-[#39b2ad]"
                  />
                </div>
                <div className="flex items-center justify-center pt-6 pb-4">
                  <button
                    type="submit"
                    className=" px-6 py-4 rounded-md text-3xl  bg-[#39b2ad] hover:bg-[#13726f] "
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
