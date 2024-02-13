import React, { useState, useEffect } from "react";
import axios from "axios";
import "./homepage.css";
import toast from "react-hot-toast"

const Homepage = ({ user, setLoginUser }) => {
    const [images, setImages] = useState([]);

    const convert = async (e) => {
        const file = e.target.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const imgData = reader.result; 
                try {
                    await postimage(imgData);
                    setImages((prevImages) => [...prevImages, imgData]);
                } catch (error) {
                    console.error("Error posting image:", error);
                }
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
            };
        }
    };
    
    const postimage = async (imgData) => {
        try {
            const response = await axios.post(
                'http://localhost:3001/api/v1/postImage',
                { imgData },
                {
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },
                }
            );
            if(response) toast.success("Image posted successfully");
            else toast.error("Error!!");
        } catch (error) {
            toast.error("Error!!");
            console.error(error.response.data);
        }
    };

    const getAllImages = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/getimages', {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });
            setImages(response.data || []); 
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllImages();
    }, [user]); 

    return (
        <div className="homepage">
            <div className="format">
                <label htmlFor="imageInput" className="postImageButton">
                    Post image
                </label>
                <input
                    id="imageInput"
                    accept="image/*"
                    type="file"
                    onChange={convert}
                    style={{ display: "none" }} 
                />
            </div>
            <div className="imageStyle">
                {Array.isArray(images) && images.length > 0
                    ? images.map((imgData, index) => (
                        <div key={index}>
                            <img width={700} height={700} src={imgData} alt={`Uploaded ${index}`} />
                        </div>
                    ))
                    : "No images available"}
            </div>
        </div>
    );
};

export default Homepage;
