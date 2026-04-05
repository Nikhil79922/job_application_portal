const TryCatch = (handle) => {
    return async (req, res, next) => {
        try {
            await handle(req, res, next);
        }
        catch (error) {
            console.log(`Catched Error`, error);
            next(error);
        }
    };
};
export default TryCatch;
