import React, { useEffect, useState } from 'react';
import './App.css';
import TabsContainer from './Tabs';
import GridsContainer from './Grids';
import DialogContainer from './Dialog';

function App() {
  const [data, setData] = useState<{
    results: any[];
    rulesMap: Record<string, any>;
  } | null>(null);
  const [error, setError] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  
  useEffect(() => {
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0");
    
    fetch(`Data.json?t=${timestamp}`)
      .then((res) => res.json())
      .then((sarif) => {
        type Rule = {
          id: string;
          [key: string]: any;
        };
        const results = sarif?.runs?.[0]?.results || [];
        const rules = sarif?.runs?.[0]?.tool?.driver?.rules || [];
        const rulesMap = Object.fromEntries(rules.map((r: Rule) => [r.id, r]));
        setData({ results, rulesMap });
      })
      .catch(() => setError(true));
  }, []);

  // ✅ thiếu hàm này
  const showLocationPopup = (html: string) => {
    setPopupContent(html);
    setShowPopup(true);
  };

  if (!data) return <div className="container">Loading...</div>;
  if (error) return <div className="container text-red">❌ Lỗi đọc file JSON</div>;

  const { results, rulesMap } = data;

  return (
    <div className="container">
      <h2>Report Bugs</h2>
      <TabsContainer
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        results={results}
        rulesMap={rulesMap}
      />
      <GridsContainer
        activeTab={activeTab}
        results={results}
        rulesMap={rulesMap}
        onShowPopup={showLocationPopup}
      />
      <DialogContainer
        popupContent={popupContent}
        showPopup={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}

export default App;