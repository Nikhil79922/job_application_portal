const TryCatch = (handle) => {
    return async (req, res, next) => {
        try {
            await handle(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
export default TryCatch;
