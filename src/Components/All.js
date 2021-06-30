export default function All({ allData }) {
  return (
    <div className="all">
      <div className="all-content">
        <div className="all-element">Cases: {allData.cases}</div>
        <div className="all-element">Deaths: {allData.deaths}</div>
        <div className="all-element">Recovered:{allData.recovered}</div>
      </div>
    </div>
  );
}
