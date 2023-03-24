import HireItem from "../HireItem/HireItem";
import ValueStats from "../ValueStats/ValueStats";
import styles from "./DailyStats.module.scss";

export default async function DailyStats() {
  const statsData = await getDailyStatistic();

  return (
    <section className={styles["todaysStats"]}>
      <div className={styles["todaysStats_heading"]}>
        <h2>Todays Statistics</h2>
        <p>Current Date</p>
      </div>
      <ValueStats title={"Income"} dailyData={statsData.income} />
      <ValueStats title={"Expences"} dailyData={statsData.expences} />
      <div className={styles.hireStatistic}>
        <div className={styles.dailyStatistic_heading}>
          <h3>Hire vs Cancel</h3>
          <p>Today</p>
        </div>
        <div className={styles.hireAndCancel_list}>
          <HireItem
            title={"Hired"}
            percentageData={{
              today: statsData.hireStatistic.today.hired,
              yesterday: statsData.hireStatistic.yesterday.hired,
            }}
          />
          <HireItem
            title={"Canceled"}
            percentageData={{
              today: statsData.hireStatistic.today.canceled,
              yesterday: statsData.hireStatistic.yesterday.canceled,
            }}
          />
          <HireItem
            title={"Pending"}
            percentageData={{
              today: statsData.hireStatistic.today.pending,
              yesterday: statsData.hireStatistic.yesterday.pending,
            }}
          />
        </div>
      </div>
    </section>
  );
}

async function getDailyStatistic() {
  const res = await fetch(`${process.env.URL}/api/statistic`, {
    next: { revalidate: 600 },
  });
  const data = await res.json();
  console.log(data);
  return data;
}
