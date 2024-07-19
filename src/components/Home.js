import Note from "./Note"; // Import the Note component

const Home = (props) => {
  // Destructure showAlert from props
  const { showAlert } = props;

  return (
    // Container to hold the Note component
    <div className="container text-center">
      {/* Render the Note component and pass showAlert as a prop */}
      <Note showAlert={showAlert} />
    </div>
  );
};

export default Home;
