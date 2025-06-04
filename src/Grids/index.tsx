import React from 'react';

interface GridsContainerProps {
  activeTab: string;
  results: any[];
  rulesMap: Record<string, any>;
  onShowPopup: (html: string) => void;
}

const GridsContainer: React.FC<GridsContainerProps> = ({
  activeTab,
  results,
  rulesMap,
  onShowPopup,
}) => {
  const filteredResults = activeTab === "All"
    ? results
    : results.filter((r) => {
        const rule = rulesMap[r.ruleId] || {};
        return (r.securitySeverityName || rule.securitySeverityName || "Unknown") === activeTab;
      });

  return (
    <div id="tableContainer" className="tableContainer">
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>STT</th>
            <th rowSpan={2}>Rule ID</th>
            <th>Precision</th>
            <th>Problem Severity</th>
            <th>Security Severity</th>
            <th>Rule Description</th>
            <th>Message</th>
          </tr>
          <tr>
            <th colSpan={3}>Location</th>
            <th>Error Attack</th>
            <th>Fix suggestion</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((r, idx) => {
            const rule = rulesMap[r.ruleId] || {};
            const location = r.locations?.[0]?.physicalLocation;
            const region = location?.region || {};
            const file = location?.artifactLocation?.uri || "";
            const line = region.startLine || "";
            const column = region.startColumn || "";

            const cssClass = `severityName-${r.securitySeverityName || rule.securitySeverityName || "Unknown"}`;

            const allUris: string[] = [];
            r.codeFlows?.forEach((cf: any) => {
              cf.threadFlows?.forEach((tf: any) => {
                tf.locations?.forEach((loc: any) => {
                  const uri = loc.location?.physicalLocation?.artifactLocation?.uri;
                  const reg = loc.location?.physicalLocation?.region || {};
                  const lineF = reg.startLine || "";
                  const colF = reg.startColumn || "";
                  const msg = loc.location?.message?.text || "";
                  if (uri)
                    allUris.push(`<div class='item'><strong>Location:</strong> ${uri}:${lineF}:${colF}<br/><strong>Message:</strong> ${msg}</div>`);
                });
              });
            });

            return (
              <React.Fragment key={idx}>
                <tr className={`${idx % 2 === 0 ? "even" : "odd"} ${cssClass}`}>
                  <td rowSpan={2}>{idx + 1}</td>
                  <td rowSpan={2}>{r.ruleId}</td>
                  <td>{r.precision || rule.precision || ""}</td>
                  <td>{r.problemSeverity || rule.problemSeverity || ""}</td>
                  <td>{r.securitySeverity || rule.securitySeverity || ""}</td>
                  <td>{rule.fullDescription?.text || rule.shortDescription?.text || ""}</td>
                  <td>
                    <div className="item">
                      {r.message?.text?.split('\n').map((m: string, i: number) => (
                        <div key={i}>{m}</div>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr className={`${idx % 2 === 0 ? "even" : "odd"} ${cssClass}`}>
                  <td colSpan={3}>
                    {file}:{line}:{column}
                    <span
                      className="lookup"
                      onClick={() => onShowPopup(allUris.join(""))}
                      style={{ cursor: "pointer", color: "#004f9e", marginLeft: "10px" }}
                    >
                      🔍
                    </span>
                  </td>
                  <td>{r.attackerActions || ""}</td>
                  <td>{typeof r.fixes === "string" ? r.fixes : ""}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GridsContainer;
