import React, { useEffect, useState } from 'react';

const History = () => {
  const [historyData, setHistoryData] = useState([]); // State to store history data
  const userid = localStorage.getItem('user_id'); // Get user_id from localStorage

  useEffect(() => {
    // Function to fetch the history data from the API
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/scrapping/pasthistory/?user=${userid}`);
        
        if (response.ok) {
          const data = await response.json();
          setHistoryData(data); // Update the state with fetched data
        } else {
          console.error('Error fetching history:', response.status);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchHistory(); // Call the fetch function
  }, [userid]); // Dependency array with userid

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            History
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            {/* Render history data */}
            {historyData.length > 0 ? (
              <ul>
                {historyData.map((item) => (
                  <li key={item.id}>
                    <p><strong>URL:</strong> {item.url_list}</p>
                    <p><strong>Email:</strong> {item.email_list}</p>
                    <p><strong>Scrape Time:</strong> {new Date(item.scrape_time).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No history found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
