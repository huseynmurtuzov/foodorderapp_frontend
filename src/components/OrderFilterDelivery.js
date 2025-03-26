import { useRef, useState,useEffect } from "react";

const OrderFilterDelivery = ({ setFilter }) => {
    const [activeTab, setActiveTab] = useState("Prepared");



    const handleTabClick = (status) => {
        setActiveTab(status);
        setFilter(status);
    };

    return (
        <div className="order-filter">
             <button 
                className={`tab-button ${activeTab === "Prepared" ? "active" : ""}`} 
                onClick={() => handleTabClick("Prepared")}
            >
                Preparing
            </button>
            <button 
                className={`tab-button ${activeTab === "Delivered" ? "active" : ""}`} 
                onClick={() => handleTabClick("Delivered")}
            >
                Delivered
            </button>
            
            <button 
                className={`tab-button ${activeTab === "All" ? "active" : ""}`} 
                onClick={() => handleTabClick("All")}
            >
                All
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

export default OrderFilterDelivery;
