import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem';
import '../styles/profilepage.css'
import Nav from '../components/Nav';
import ClipLoader from 'react-spinners/ClipLoader';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from "react-router";
function ProfilePage() {
    const navigate=useNavigate();
    const [profile,setProfile]=useState([]);
    const [loader,setLoader]=useState(false);
    const [storyLoader,setStoryLoader]=useState(false);
    const [postLoader,setPostLoader]=useState(false);
    const [stories,setStories]=useState([]);
    const [posts,setPosts]=useState([]);
    const {user_name}=useParams();
    useEffect(()=>{
        const getprofile=async()=>{
            setLoader(true)
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${user_name}`,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials: true
            });
            setProfile(res.data.user);
            setLoader(false)
            setStoryLoader(true);
            const storyres=await axios.get(`${import.meta.env.VITE_API_URL}/api/story/${user_name}`,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true
            });
            setStories(storyres.data.stories);
            setStoryLoader(false);
            setPostLoader(true);
            const postres=await axios.get(`${import.meta.env.VITE_API_URL}/api/post/${user_name}`,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true
                });
            setPosts(postres.data.posts);
            setPostLoader(false);
        }
        getprofile();
    },[]);
    return (
        <>
            <Nav profile={true} home={false} showSearch={false}/>
            {loader?<ClipLoader/>:<>
                <div className="profile-cont">
                    <img className='prof-pic-lg' src={profile.profile_pic}/>
                    <div className="profile-about">
                        <h1>{profile.user_name}</h1>
                        <div className="prof-connections">
                            <div className='prof-pic-user-cont'>
                                <img className='prof-pic-md' src={profile.profile_pic}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stories-container">
                    {storyLoader ? <ClipLoader/>:
                    !stories? ""
                    :stories.map(item=>
                        <div className='storie-cont' key={item.id}>
                            <div className="story" >
                                <video src={item.video} />
                            </div>
                        </div>
                        
                    )}
                </div>
            </>}
        </>
    )
}

export default ProfilePage;