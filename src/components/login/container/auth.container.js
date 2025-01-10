import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { getSignup, getUsers, getLogin } from "../auth.api";
import { setUserDetails } from "../../../redux/user_management/reducer";

const auth = () => {
  const [isTeamSignup, setIsTeamSignup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (values) => {
    try {
      const responseData = await getUsers();

      if (Array.isArray(responseData)) {
        const emailExists = responseData.some(
          (user) => user.email_id === values.email
        );
        if (emailExists) {
          message.error("This email is already registered. Please log in.");
          return;
        }
      } else if (responseData && responseData.data) {
        const emailExists = responseData.data.some(
          (user) => user.email_id === values.email
        );
        if (emailExists) {
          message.error("This email is already registered. Please log in.");
          return;
        }
      } else {
        message.error("Unexpected response format from the server.");
        return;
      }

      const userData = {
        first_name: values.firstName,
        last_name: values.lastName,
        user_type: isTeamSignup ? "Team" : "Customer",
        user_sub_type: isTeamSignup ? values.userSubType : "Customer",
        profession: values.profession,
        country_code: values.countryCode,
        mobile_number: values.mobileNumber,
        email_id: values.email,
        currency: "INR",
      };

      const signupResponse = await getSignup(userData);

      if (signupResponse) {
        dispatch(profileDetails(userData));

        localStorage.setItem("userData", JSON.stringify(userData));

        message.success("Signup successful!");
        navigate("/");
      } else {
        message.error("Signup failed. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleLogin = async (values) => {
    try {
      const users = await getUsers();
      const user = users?.data.find((u) => u.email_id === values.email);

      if (!user) {
        message.error("User not found. Please check your email.");
        return;
      }

      const payload = {
        mobile_number: user.mobile_number,
      };

      const response = await getLogin(payload);
      if (response && response.success) {
        // const userDetails = {
        //   username: user.username,
        //   firstName: user.first_name,
        //   lastName: user.last_name,
        //   email: user.email_id,
        //   mobileNumber: user.mobile_number,
        //   gap_id: user?.gap_id
        // };

        const userDetails = {
          username: user.username || "",
          pin_code: user.pin_code || "",
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          gender: user.gender || null,
          date_of_birth: user.date_of_birth || null,
          country_code: user.country_code || "",
          mobile_number: user.mobile_number || "",
          email_id: user.email_id || null,
          location: user.location || null,
          currency: user.currency || "",
          user_status: user.user_status || "",
          gap_id: user.gap_id || "",
          emp_id: user.emp_id || null,
          user_type: user.user_type || "",
          user_sub_type: user.user_sub_type || "",
          profession: user.profession || "",
          user_rating: user.user_rating || null,
          user_image_path: user.user_image_path || null,
          address: user.address || null,
          created_at: user.created_at || null,
          updated_at: user.updated_at || null,
          loyalty_coins: user.loyalty_coins || ""
      };
  

        dispatch(setUserDetails(userDetails));
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        message.success(`OTP sent: ${response.otp}`);
        navigate("/home");
      } else {
        message.error(response.message || "Invalid credentials.");
      }
    } catch (error) {
      message.error("An error occurred during login. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return { isTeamSignup, setIsTeamSignup, handleSignup, handleLogin};
};

export default auth;
