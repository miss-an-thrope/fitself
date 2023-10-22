/* eslint-disable react/prop-types */

// styles
import '../../../assets/scss/components/pages/RecipesPage/_recipesSearch.scss';

function RecipesSearch({
  type,
  placeholder,
  required = true,
  value,
  name,
  handleInputChange,
  rightIcon,
}) {
  return (
    <>

      <input
        className='recipesSearch__search'
        type={type || "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(e)}
        required={required}

      />
      {rightIcon && (
        <> 
            {rightIcon}
        </>
      )}

    </>
  );
}

export default RecipesSearch;