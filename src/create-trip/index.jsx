import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SelectBudgeOption, SelectTravelersList } from "@/constant/option";
import { AI_PROMPT } from "@/constant/option";
import { chatSession } from "@/services/AIMODAL";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseconfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaWallet, FaUsers } from 'react-icons/fa';

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google Login Token Response:", tokenResponse);
      getUserProfile(tokenResponse);
    },
    onError: (errorResponse) => {
      console.error("Google Login Error Response:", errorResponse);
    },
    flow: "implicit",
  });

  const saveAiTrips = async (TripData) => {
    try {
      setLoading(true);
  
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (!user || !user.id) {
        throw new Error("User is not authenticated or user ID is missing.");
      }
      
      const docId = Date.now().toString();
      const docRef = doc(db, "Aitrips", docId);
  
      const tripDataToSave = {
        userSelection: formData,
        tripData: TripData,
        userEmail: user?.email,
        id: docId
      };
  
      await setDoc(docRef, tripDataToSave);
  
      console.log("Trip data saved successfully:", tripDataToSave);
      
      setLoading(false);
  
      navigate('/view-trip/' + docId);
  
    } catch (error) {
      console.error("Error saving trip data:", error);
      setLoading(false);
    }
  };

  const getUserProfile = async (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("User Profile:", response);
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const onGenerateTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (!formData?.noOfDays || formData.noOfDays > 7) {
      alert("Please enter a valid trip duration ☺️ :)");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.city)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    console.log("Final Prompt:", FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("Chat Result:", result?.response?.text());
      setLoading(false);
      saveAiTrips(result?.response?.text());
    } catch (error) {
      setLoading(false);
      console.error("Error sending message to chat session:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      onGenerateTrips();
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl p-10 mb-8 transform hover:scale-105 transition-transform duration-300">
        <h1 className="font-bold text-4xl mb-6 text-indigo-800 text-center">
          Plan Your Dream Trip 🌍✈️
        </h1>
        <p className="mb-8 text-gray-600 text-xl text-center">
          Let our AI create a personalized itinerary based on your preferences.
        </p>

        <div className="space-y-8">
          <div className="relative">
            <FaMapMarkerAlt className="absolute top-4 left-4 text-indigo-500 text-2xl" />
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Where do you want to go?"
              className="w-full p-4 pl-12 border-2 border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out text-lg placeholder-gray-400"
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>

          <div className="relative">
            <FaCalendarAlt className="absolute top-4 left-4 text-indigo-500 text-2xl" />
            <input
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              placeholder="How many days?"
              className="w-full p-4 pl-12 border-2 border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out text-lg placeholder-gray-400"
            />
          </div>

          <div>
            <h2 className="text-2xl mb-4 font-medium text-indigo-800 flex items-center">
              <FaWallet className="mr-2" /> What's your budget?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SelectBudgeOption.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-6 border-2 cursor-pointer rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    formData.budget === item.title
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "bg-white hover:shadow-lg"
                  }`}
                >
                  <h2 className="text-4xl mb-2">{item.cost}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm opacity-75">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl mb-4 font-medium text-indigo-800 flex items-center">
              <FaUsers className="mr-2" /> Who's coming along?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SelectTravelersList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("travelers", item.title)}
                  className={`p-6 border-2 cursor-pointer rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    formData.travelers === item.title
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "bg-white hover:shadow-lg"
                  }`}
                >
                  <h2 className="text-4xl mb-2">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm opacity-75">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button
            onClick={onGenerateTrips}
            disabled={loading}
            className="transition-all duration-300 transform hover:scale-105 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            ) : null}
            {loading ? "Creating Your Adventure..." : "Generate My Trip"}
          </Button>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-800">Login Required</DialogTitle>
            <DialogDescription className="text-lg text-gray-600">
              Please login to generate your personalized trip itinerary.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button onClick={() => login()} className="flex items-center bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:bg-gray-100 hover:border-gray-400">
              <FcGoogle className="mr-2 text-2xl" />
              Login with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;