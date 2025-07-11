
const CatCard = ({ cat, onBreedClick, onOriginClick }) => {
  const breed = cat.breeds[0];

  return (
    <div className="cat-card">
      <img src={cat.url} alt="cat" width={300} />

      <h3 className="selected" onClick={onBreedClick}>
        Breed: {breed.name}
      </h3>

      <h3 className="selected-2" onClick={onOriginClick}>
        Origin: {breed.origin}
      </h3>

      <h4>Temperament: {breed.temperament}</h4>
      
    </div>
  );
};

export default CatCard;
