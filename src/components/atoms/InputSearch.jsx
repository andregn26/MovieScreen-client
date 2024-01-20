const InputSearch = ({ className = "", placeholder, onChange, value }) => {
	return (
		<input
			type="text"
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			className={`${className} input bg-base-200  md:w-auto`}
		/>
	);
};

export default InputSearch;
