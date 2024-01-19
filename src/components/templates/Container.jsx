import React from "react";

const Container = ({ className, children }) => {
	return <section className={`${className} w-full px-8 md:px-12  xl:px-16 mt-24 flex flex-col items-center`}>{children}</section>;
};

export default Container;
