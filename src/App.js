import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);

  async function fetchData() {
    setLoading(true)
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false)
      setTours(data)
     
      
    } catch (error) {
      setLoading(true)
      console.log(error);
      
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  function removeTour(id) {
    const newTours = tours.filter(tour => tour.id !== id)
    setTours(newTours)
  }

  if(tours.length === 0){
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={fetchData}> refresh</button>
        </div>
     </main>
    )
  }
  return (
    <>
      {loading ? (<main>
        
        <Loading />
        
        
      </main>) :
        (
          < main > <Tours tours={tours} removeTour={removeTour} />
          </main>
        
          )
     }
     
     
    
     
    </>
  );
}


export default App;
