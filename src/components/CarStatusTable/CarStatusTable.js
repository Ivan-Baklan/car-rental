import Image from "next/image";
import styles from "./CarStatusTable.module.scss";

import alex from "../../../public/pictures/Alex.png";
import luke from "../../../public/pictures/Luke.png";
import razib from "../../../public/pictures/Razib.png";

const picturesSource = {
  "Alex Noman": alex,
  "Razib Rahman": razib,
  "Luke Norton": luke,
};

const statusSource = {
  Completed: "Completed",
  "In route": "In_route",
  Pending: "Pending",
};

export default async function CarStatusTable() {
  const driverList = await getLiveCarStatus();

  return (
    <table className={styles.driverStatus_table}>
      <thead>
        <tr className={styles.row_heading}>
          <th>No.</th>
          <th>Car no.</th>
          <th>Driver</th>
          <th>Status</th>
          <th>Earning</th>
        </tr>
      </thead>
      <tbody>
        {driverList.map((_elem) => {
          return (
            <tr key={_elem.id} className={styles.row_mainContent}>
              <td className={styles.number}>{_elem.No}</td>
              <td className={styles.carNumber}>
                <span>{_elem.carNo}</span>
              </td>
              <td className={styles.driverName}>
                <Image src={picturesSource[_elem.DriverName]} />
                {_elem.DriverName}
              </td>
              <td className={styles[`status_${statusSource[_elem.status]}`]}>
                {_elem.status}
              </td>
              <td className={styles.earning}>{"$ " + _elem.earning}</td>
              <button>Details</button>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

async function getLiveCarStatus() {
  const res = await fetch("http://localhost:3000/api/carList");
  const data = await res.json();
  return data;
}
