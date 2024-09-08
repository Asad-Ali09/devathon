import { useAppSelector } from "../hooks/ReduxHooks";

const Home = () => {
  //redux
  const { name, email, address } = useAppSelector((state) => state.user);
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="">{name}</h1>
      <h5>{email}</h5>
      <p>{address}</p>
    </div>
  );
};

export default Home;
