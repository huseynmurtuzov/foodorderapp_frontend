import { useRef, useState,useEffect } from "react";

const OrderFilterCustomer = ({ setFilter }) => {
    const [activeTab, setActiveTab] = useState("pending");
    
    const handleTabClick = (status) => {
        setActiveTab(status);
        setFilter(status);
    };

    return (
        <div className="order-filter">
            <button 
                className={`tab-button ${activeTab === "pending" ? "active" : ""}`} 
                onClick={() => handleTabClick("pending")}
            >
                Pending
            </button>
            <button 
                className={`tab-button ${activeTab === "All" ? "active" : ""}`} 
                onClick={() => handleTabClick("All")}
            >
                All
            </button>
            
            <button 
                className={`tab-button ${activeTab === "Delivered" ? "active" : ""}`} 
                onClick={() => handleTabClick("Delivered")}
            >
                Delivered
            </button>
            <button 
                className={`tab-button ${activeTab === "Cancelled" ? "active" : ""}`} 
                onClick={() => handleTabClick("Cancelled")}
            >
                Cancelled
            </button>
        </div>
    );
};

export default OrderFilterCustomer;
