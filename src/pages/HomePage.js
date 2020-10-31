import React, { useEffect, useState, Suspense, lazy } from "react";

// UTILS
import { pageVariants } from "../utils";

// FRAMER-MOTION
import { motion } from "framer-motion";

// AXIOS
import axios from "../axios";

// CSS
import "../css/homePage.css";

// COMPONENTS
import CategorySection from "../components/CategorySection";
const Footer = lazy(() => import("../components/Footer"));

function HomePage() {
  /*const categories = [
    {
      title: "Always-ready wireless earphones",
      products: [
        {
          name: "Beats Flex",
          promo: "wireless earphones for all-day wear",
          colors: ["black", "blue", "yellow", "white"],
          charecteristics: [
            "Magnetic earbuds with Auto-Play/Pause",
            "Powerful, precise sound",
            "Up to 12 hours of listening time",
            "Apple W1 Chip & Class 1 Wireless Bluetooth®",
          ],
          price: 49.99,
          image:
            "https://cdn.idropnews.com/wp-content/uploads/2020/10/20083717/Beats-Flex-Audio-Sharing.jpg",
        },
      ],
    },
    {
      title: "High-performance wireless earphones",
      products: [
        {
          name: "Powerbeats",
          promo: "Lightweight wireless earphones for all-day activity",
          colors: ["grey", "black", "burgundy"],
          charecteristics: [
            "Up to 15 hours of listening time",
            "Sweat & water resistant",
            "Adjustable, secure-fit earhooks",
            "Streamlined, round cable",
          ],
          price: 149.95,
          image:
            "https://img.xshoppy.shop/uploader/7e29b2f7ebc65e9d203022e65cfd7796c8237723.jpg",
        },
        {
          name: "Powerbeats Pro",
          promo: "totally wireless earphones built for performance",
          colors: ["grey", "darkblue", "black", "white"],
          charecteristics: [
            "Up to 9 hours of listening time",
            "Sweat & water resistant",
            "Adjustable, secure-fit earhooks",
            "Volume & track controls on each earbud",
          ],
          price: 249.95,
          image:
            "https://www.beatsbydre.com/content/dam/beats/web/product/earphones/powerbeats-pro/plp/bbd.plpassset.earphones.powerbeatspro.jpg.large.1x.jpg",
        },
      ],
    },
    {
      title: "Everyday wireless on-ear headphones",
      products: [
        {
          name: "Solo Pro",
          promo: "Noise cancelling wireless headphones to stay inspired",
          colors: ["black", "grey", "white"],
          charecteristics: [
            "Active Noise Cancelling (ANC)",
            "Transparency Mode",
            "Up to 22 hours of listening time",
            "Integrated on-ear controls",
          ],
          price: 299.95,
          image:
            "https://cdn.images.express.co.uk/img/dynamic/59/590x/Beats-Solo-Pro-1191048.jpg?r=1571155392747",
        },
        {
          name: "Beats Solo3 Wireless",
          promo: "Classic all-day headphones",
          colors: ["black", "lessRed", "burgundy"],
          charecteristics: [
            "Up to 40 hours of listening time",
            "Fast Fuel technology",
            "On‑ear controls",
            "Apple W1 Chip & Class 1 Wireless Bluetooth®",
          ],
          price: 199.95,
          image:
            "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/plp/bbd.plpassset.headphones.solo3wireless.jpg.large.1x.jpg",
        },
      ],
    },
    {
      title: "Premium sound wireless over-ear headphones",
      products: [
        {
          name: "Beats Studio3 Wireless",
          promo: "Noise cancelling wireless headphones to block distractions",
          colors: ["black", "redBlack", "burgundy", "white"],
          charecteristics: [
            "Active Noise Cancelling (ANC)",
            "Up to 22 hours of listening time",
            "Apple W1 Chip & Class 1 Wireless Bluetooth®",
            "On‑ear controls",
          ],
          price: 349.95,
          image:
            "https://sgp1.digitaloceanspaces.com/gh-assets/wp-content/uploads/2020/04/23175832/beats-studio3-wireless-over-ear-headphones-01.jpg",
        },
      ],
    },
    {
      title: "Wired options",
      products: [
        {
          name: "Beats EP",
          promo: "Wired headphones built for life",
          colors: ["blueblue", "grey", "black", "white"],
          charecteristics: [
            "Durable, lightweight design",
            "Adjustable vertical sliders",
            "RemoteTalk cable",
          ],
          price: 129.95,
          image:
            "https://www.beatsbydre.com/content/dam/beats/web/product/headphones/ep/pdp/202010/beatsep-pdp-p01.jpg.large.1x.jpg",
        },
      ],
    },
    {
      title: "Compact yet powerful wireless speaker",
      products: [
        {
          name: "Beats Pill+",
          promo: "Portable wireless speaker",
          colors: ["grey", "black", "lessRed"],
          charecteristics: [
            "Up to 12 hours of play time",
            "Defined, pure sound quality",
            "Charge‑out USB port for powering devices",
          ],
          price: 179.95,
          image:
            "https://www.beatsbydre.com/content/dam/beats/web/product/speakers/pill-plus/pdp/202010/pillplus-pdp-p01.jpg.large.1x.jpg",
        },
      ],
    },
  ];*/

  const [categoriesData, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      axios
        .get(`/categories/`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => {
          setCategories(data.categories);
        })
        .catch((err) => console.log(err));
    };
    fetchCategoriesData();
  }, []);

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ ease: "easeOut", duration: 0.2 }}
    >
      <div className="homePage">
        {categoriesData.map((category, index) => {
          return <CategorySection key={index} category={category} />;
        })}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </motion.div>
  );
}

export default HomePage;
