/*Page contenant les excuses de dev individuelles, avec affichage de l'id de l'excuse dans la barre d'url
Le loading a une durée aléatoire (jusqu'à 5 secondes) */

/* imports */
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "./Error";
import FadeIn from "react-fade-in/lib/FadeIn";
import { toast } from "react-toastify";

const ExcusePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [excuses, setExcuses] = useState("");
  const [displayedExcuse, setDisplayedExcuse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  /* fonction de récupération de l'excuse affichée */
  const fetchSingleExcuse = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios("http://localhost:3000/");
      setExcuses(data);
      setDisplayedExcuse(
        data.find(
          (element) => element.http_code == window.location.pathname.slice(1)
        )
      );
      /* loading aléatoire */
      setTimeout(() => {
        setIsLoading(false);
      }, Math.ceil(Math.random() * 5000));
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  /* fonction pour passer à l'excuse suivante de manière aléatoire */
  const generateExcuse = () => {
    setIsLoading(true);
    try {
      window.history.pushState(
        null,
        null,
        `${excuses[Math.floor(Math.random() * excuses.length)].http_code}`
      );
      setDisplayedExcuse(
        excuses.find(
          (element) => element.http_code == window.location.pathname.slice(1)
        )
      );
      setTimeout(() => {
        setIsLoading(false);
      }, Math.ceil(Math.random() * 5000));
    } catch (error) {}
  };

  /* fonction pour poster une nouvelle excuse de dev et pour l'afficher directement après la requête */
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!message) {
      toast.error("Please write an excuse in the dedicated field");
      setIsLoading(false);
      return;
    }
    try {
      await axios.post(
        `http://localhost:3000/${excuses[excuses.length - 1].http_code + 1}`,
        { message }
      );
      window.history.pushState(
        null,
        null,
        `${excuses[excuses.length - 1].http_code + 1}`
      );
      fetchSingleExcuse();
      setIsModalOpen(false);
      setIsLoading(false);
      setMessage("");
      toast.success("New excuse created ;D");
    } catch (error) {
      setIsLoading(false);
      console.log(error.response);
    }
  };

  /*récupération des données de l'excuse à chaque chargement de page*/
  useEffect(() => {
    fetchSingleExcuse();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  /* modale de création d'excuse */
  if (isModalOpen) {
    return (
      <div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Your new dev excuse :</label>
          <input
            type="text"
            className="modal-text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoFocus
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
          <button
            className="close-modal-btn"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }

  /* Si l'annonce affichée n'est pas définie lors du chergement de la page,
  je renvoie l'utilisateur vers la page d'erreur. Si tout se passe bien, j'affiche ma div contenant mon titre,
  l'excuse, le bouton de génération et le bouton de création d'excuse */
  return displayedExcuse !== undefined ? (
    <div className="sentence-container">
      <h1>My dev irrefutable excuses application</h1>
      <h2 className="sentence">"{displayedExcuse.message}"</h2>
      <button onClick={generateExcuse}>Generate new excuse</button>
      <FadeIn>
        <button onClick={() => setIsModalOpen(true)} className="open-modal-btn">
          Add a new excuse
        </button>
      </FadeIn>
    </div>
  ) : (
    <Error />
  );
};
export default ExcusePage;
