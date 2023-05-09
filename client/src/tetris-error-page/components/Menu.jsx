import "./Menu.css";

const Menu = ({ onClick }) => {
  return (
    <div className="Menu">
      <h1>Error 404 x__x</h1>
      <button className="menu-btn" onClick={onClick}>
        Wanna play Tetris ?
      </button>
    </div>
  );
};
export default Menu;
