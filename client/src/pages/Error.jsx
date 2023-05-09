/* page d'erreur 404, comportant un jeu tetris jouable au clavier. 
Par manque de temps pour optimiser l'affichage, j'ai rendu le tetris utilisatble sur les machines ayant
une largeur d'écran supérieure à 1460px. En dessous de cette taille, une simple page d'erreur est affichée */

import Game from "../tetris-error-page/components/Game";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      {window.innerWidth > 1460 ? (
        <div className="error-page">
          <div className="main-container">
            <div className="error-msg">
              <h2 className="error-title">OooOps !</h2>
              <p className="error-text">
                The page you are looking for seems unreachable
              </p>
              <button className="menu-btn">
                <Link to="/" className="return-home">
                  Go back to the title page
                </Link>
              </button>
              <div>
                <h3 className="tetris-controls-title">Tetris controls</h3>
                <ul className="tetris-controls">
                  <li>Move element: Right and Left arrows</li>
                  <li>Move element down: Down arrow</li>
                  <li>Rotation: Up arrow</li>
                  <li>Fast drop: Space</li>
                  <li>Pause: P</li>
                  <li>Leave the game: R</li>
                </ul>
              </div>
            </div>
            <div className="tetris-container">
              <Game rows={20} columns={10} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Error 404 x__x</h1>
          <button>
            <Link to="/" className="return-home">
              Go back to the title page
            </Link>
          </button>
        </div>
      )}
    </>
  );
};
export default Error;
