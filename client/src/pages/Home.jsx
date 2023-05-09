/* page d'accueil avec titre et bouton pour générer une excuse.
J'ai réalisé les animations avec les librairies react-fade-in et framer-motion */

/* imports */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import FadeIn from "react-fade-in";
import { motion } from "framer-motion";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /* fonction pour naviguer vers la page d'excuse individuelle générée aléatoirement */
  const navigateToRandomExcuse = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios("http://localhost:3000/");
      navigate(`${data[Math.floor(Math.random() * data.length)].http_code}`, {
        replace: true,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  /* affichage de la page d'accueil avec les animations sur les éléments */
  return (
    <div className="sentence-container">
      <FadeIn childClassName="title" transitionDuration={1000}>
        <motion.h1 animate={{ y: -200 }} transition={{ delay: 2, duration: 2 }}>
          My dev irrefutable excuses application
        </motion.h1>
      </FadeIn>
      <FadeIn delay={2000}>
        <motion.button
          onClick={navigateToRandomExcuse}
          animate={{ y: -25 }}
          transition={{ delay: 2, duration: 2 }}
        >
          Generate new excuse
        </motion.button>
      </FadeIn>
    </div>
  );
};
export default Home;
