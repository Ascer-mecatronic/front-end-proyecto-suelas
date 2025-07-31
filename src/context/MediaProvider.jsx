import { useMediaContent } from "../hooks/useMediaContent"
import { MediaContext } from "./MediaContext"

export const MediaProvider = ({ children }) => {

    const {
        pages,
        pageSelected,
        initialPageForm,
        errorsPage,
        getPages,
        handlerAddPages,
        handleRemovePage,
        handlerPageSelected,
        handleCloseFrm,
    } = useMediaContent();

    return (
        <MediaContext.Provider value={
            {
                pages,
                pageSelected,
                initialPageForm,
                errorsPage,
                getPages,
                handlerAddPages,
                handleRemovePage,
                handlerPageSelected,
                handleCloseFrm,
            }
        }>
            {children}
        </MediaContext.Provider>
    )
}