/* page /lost avec un joli petit gif de Lost... 
L'utilisateur est redirigé vers la page d'accueil après 5 secondes*/

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Lost = () => {
  const navigate = useNavigate();

  /* redirection */
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  /* affichage de la page /lost */
  return (
    <div>
      <iframe
        src="https://giphy.com/embed/1bAdvIjqaXCSc"
        width="440"
        height="265"
        allowFullScreen
      ></iframe>
      <h1>I'm lost D; !</h1>
    </div>
  );
};
export default Lost;
