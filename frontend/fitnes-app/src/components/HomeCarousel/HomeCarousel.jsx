import { useEffect, useRef } from "react";
import styles from "./HomeCarousel.module.css";

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
  const trackRef = useRef(null);
  const positionRef = useRef(0); // 🔑 utrzymujemy pozycję między klatkami

useEffect(() => {
  const track = trackRef.current;
  const speed = 0.5;

  const animate = () => {
    positionRef.current -= speed;

    const firstListWidth = track.scrollWidth / 2;

    // szerokość jednej karty
    const cardWidth = track.children[0].getBoundingClientRect().width + 1; // +1 dla margin/padding

    // 🔥 reset 4 od końca
    const resetPoint = firstListWidth - cardWidth * 3;

    if (Math.abs(positionRef.current) >= resetPoint) {
      positionRef.current = 0;
    }

    track.style.transform = `translateX(${positionRef.current}px)`;
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}, []);

  return (
    <div className={styles.carouselWrapper}>
      <h3 className={styles.carouselTitle}>Przyrządy do ćwiczeń</h3>
      <div className={styles.carouselTrack} ref={trackRef}>
        {[...items, ...items].map((item, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.iconWrapper}>{item.icon}</div>
            <div className={styles.label}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}