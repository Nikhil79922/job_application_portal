const TryCatch = (handle) => {
    return async (req, res, next) => {
        try {
            await handle(req, res, next);
        }
        catch (error) {
            console.log(error.message);
            next(error);
        }
    };
};
export default TryCatch;
