import { WorldMap } from "react-svg-worldmap";
export default function Map(props) {
  return (
    <div className="map">
      <WorldMap
        color="green"
        title=""
        value-suffix="people"
        size="lg"
        data={props.mapData.filter((e) => e.country != null)}
      />
    </div>
  );
}
