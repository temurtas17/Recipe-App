interface Props {
  area: string;
  onClick: () => void;
}

const AreaCard = ({ area, onClick }: Props) => {
  return (
    <div className="card" onClick={onClick}>
      <img src="/world.webp" alt="" />
      <div className="card-title">
        <h3>{area}</h3>
      </div>
    </div>
  );
};

export default AreaCard;
