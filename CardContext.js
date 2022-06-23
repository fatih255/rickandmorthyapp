import { createContext, useState } from "react";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const [CardContextState, setContextState] = useState(
        {
            activeCategory: { /* active Episode all information } */ }
        });

    //cardcontext actions
    const changeActiveCategory = (category) => {
        setContextState((prevState) => ({ ...prevState, activeCategory: category }))
    }


    return (<CardContext.Provider value={{ CardContextState, changeActiveCategory }}>
        {children}
    </CardContext.Provider>)
}


export default CardContext;
