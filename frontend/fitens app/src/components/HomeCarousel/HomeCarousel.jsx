import React from "react";
import styles from "./HomeCarousel.module.css";

// list of carousel items with name and an emoji character (outline style preferred)
const items = [
  { name: "Hantle", icon: "🏋️‍♂️" },
  { name: "Bieżnia", icon: "🏃‍♂️" },
  { name: "Sztanga", icon: "🏋️" },
  { name: "Skakanka", icon: "🤾‍♂️" },
  { name: "Kettlebell", icon: "🎯" },
  { name: "Rowerek", icon: "🚴‍♀️" },
  { name: "Mata do jogi", icon: "🧘‍♂️" },
];

export default function HomeCarousel() {
  const displayItems = [...items, ...items];

  return (
    <div className={styles.carouselWrapper}>
      <h3 className={styles.carouselTitle}>Przyrządy do ćwiczeń</h3>
      <div className={styles.carouselTrack}>
        {displayItems.map((item, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.iconWrapper}>{item.icon}</div>
            <div className={styles.label}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
