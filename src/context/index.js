import { useState, useEffect } from "react";

export const userContext = () => {
    const [userData, setUserData] = useState({
        username: "",
        pin_code: "",
        first_name: "",
        last_name: "",
        gender: null,
        date_of_birth: null,
        country_code: "",
        mobile_number: "",
        email_id: null,
        location: null,
        currency: "",
        user_status: "",
        gap_id: "",
        emp_id: null,
        user_type: "",
        user_sub_type: "",
        profession: "",
        user_rating: null,
        user_image_path: null,
        address: null,
        created_at: null,
        loyalty_coins: ""
    });

    useEffect(() => {
        const userDetails = localStorage.getItem("userDetails");
        console.log(userDetails, 'userdetails')
        if (userDetails) {
            const parsedUserDetails = JSON.parse(userDetails);
            console.log(parsedUserDetails, 'parsedUserDetails')
            setUserData({
                username: parsedUserDetails?.username || "-",
                pin_code: parsedUserDetails?.pin_code || "-",
                first_name: parsedUserDetails?.first_name || "-",
                last_name: parsedUserDetails?.last_name || "-",
                gender: parsedUserDetails?.gender || null,
                date_of_birth: parsedUserDetails?.date_of_birth || null,
                country_code: parsedUserDetails?.country_code || "-",
                mobile_number: parsedUserDetails?.mobile_number || "-",
                email_id: parsedUserDetails?.email|| null,
                location: parsedUserDetails?.location || null,
                currency: parsedUserDetails?.currency || "-",
                user_status: parsedUserDetails?.user_status || "-",
                gap_id: parsedUserDetails?.gap_id || "-",
                emp_id: parsedUserDetails?.emp_id || null,
                user_type: parsedUserDetails?.user_type || "-",
                user_sub_type: parsedUserDetails?.user_sub_type || "-",
                profession: parsedUserDetails?.profession || "-",
                user_rating: parsedUserDetails?.user_rating || null,
                user_image_path: parsedUserDetails?.user_image_path || null,
                address: parsedUserDetails?.address || null,
                created_at: parsedUserDetails?.created_at || null,
                loyalty_coins: parsedUserDetails?.loyalty_coins || "-"
            });
        }
    }, []);

        return userData;
};
