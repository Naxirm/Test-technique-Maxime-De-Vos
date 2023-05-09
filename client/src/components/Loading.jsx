import { Triangle } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loading-page">
      <h1>
        <Triangle
          height="150"
          width="150"
          color="#0AFFFF"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </h1>
      <h3>Loading excuse...</h3>
    </div>
  );
};
export default Loading;
