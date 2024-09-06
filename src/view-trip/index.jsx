import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoSec from './components/informationsection';
import Footer from '@/components/footer';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/services/firebaseconfig'; 

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);
  
    useEffect(() => {
      if (tripId) {
        tripId&&GetTripData();
      }
    }, [tripId]);
  
    const cleanJSONString = (jsonString) => {
      return jsonString.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); 
    };
  
    const GetTripData = async () => {
      try {
        const docRef = doc(db, "Aitrips", tripId);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          let tripData = docSnap.data();
          
          // Ensure tripData.Tripdata is a valid JSON string
          if (typeof tripData.Tripdata === 'string') {
            try {
              const cleanedJSON = cleanJSONString(tripData.Tripdata); 
              tripData.Tripdata = JSON.parse(cleanedJSON);
            } catch (parseError) {
              console.error("Error parsing JSON data:", parseError);
              setTrip(null);
              return;
            }
          }
    
          setTrip(tripData);
          // document.write(tripData);
          console.log("Document data:", tripData);



        } else {
          console.log("No such document!");
          setTrip(null);
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
        setTrip(null);
      }
    };
    
  
    if (trip === null) {
      return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
          <h2>No Trip Data Available</h2>
        </div>
      );
    }
  
    return (
      <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        <InfoSec trip={trip} />
          <Footer />
      </div>
    );
  }
  
export default ViewTrip;
