/* eslint-disable react/prop-types */
const Button = ({
    isDisabled,
    btnType,
    title,
    handleClick,
}) => {
    return (
        <button disabled={isDisabled ?? false}
            type={btnType || "button"}
            className={`recipes__more`}
            onClick={handleClick}
        >
            {title}
        </button>
    );
}

export default Button;