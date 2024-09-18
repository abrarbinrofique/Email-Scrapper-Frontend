import React, { useEffect, useState } from 'react';

const History = () => {
  const [LimitData, setLimitData] = useState([]);
  const userid = localStorage.getItem('user_id'); 

  useEffect(() => {
    // Function to fetch the history data from the API
    const fetchLimit = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/scrapping/loademail/?user=${userid}`);
        
        if (response.ok) {
          const data = await response.json();
          setLimitData(data); // Update the state with fetched data
        } else {
          console.error('Error fetching history:', response.status);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchLimit(); // Call the fetch function
  }, [userid]); // Dependency array with userid

  return (
    
        <div className="limitbg">
          <ul>
            {LimitData.length > 0 ? (
              LimitData.map((item) => (
                <div>
                  {item.scrapping_limit < 3 ? (
                    <p className='row d-flex justify-content-center align-items-center text-white m-2'>Scraping Limit:You have  {3-item.scrapping_limit} chances left.</p>
                  ) : (
                    <p>You have no more chance. Get our Premium Subscription.</p>
                  )}
                </div>
              ))
            ) : (
              <p>No data available.</p>
            )}
          </ul>
        </div>
    
  );
};

export default History;
