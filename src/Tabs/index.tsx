import React from 'react';

interface TabsContainerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  results: any[];
  rulesMap: Record<string, any>;
}

const TabsContainer: React.FC<TabsContainerProps> = ({ activeTab, setActiveTab, results, rulesMap }) => {
    const severityLevels = ["Critical", "High", "Medium", "Low"];
    const severityCounts = Object.fromEntries(severityLevels.map((s) => [s, 0]));

    results.forEach((r) => {
        const rule = rulesMap[r.ruleId] || {};
        const sev = r.securitySeverityName || rule.securitySeverityName || "Unknown";
        if (severityCounts[sev] !== undefined) severityCounts[sev]++;
    });

    return (
        <div className="tab-report">
        {['All', ...severityLevels].map((level) => (
            <button
            key={level}
            className={`tab-btn ${activeTab === level ? "active" : ""}`}
            onClick={() => setActiveTab(level)}
            >
            {level} {level !== 'All' && <span>({severityCounts[level]})</span>}
            </button>
        ))}
        </div>
    );
};

export default TabsContainer;
