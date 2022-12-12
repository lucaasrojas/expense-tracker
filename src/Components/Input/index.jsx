const Input = (props) => {
    const {id, label} = props;
    return (
        <div className={`${id}__input__wrapper input__wrapper`}>
            <label htmlFor={id}>{label}</label>
            <input id={id} type={props.type || "text"} />
        </div>
    )
}

export default Input